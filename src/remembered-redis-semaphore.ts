import { defaultLockOptions } from './get-semaphore-config';
import { Semaphore } from '@remembered/redis';
import { Mutex } from 'redis-semaphore';
import { Redis } from 'ioredis';
import { dontWait } from 'remembered';
import { StringBuffer } from './string-buffer';
import { RememberedRedisSemaphoreSettings } from './remembered-redis-semaphore-settings';

type RequiredExcept<T, keys extends keyof T> = Required<Omit<T, keys>> & T;

export class RememberedRedisSemaphore implements Semaphore {
	private settings: RequiredExcept<
		RememberedRedisSemaphoreSettings,
		'prefix' | 'fixedPrefix' | 'onLockLost' | 'onAcquireError'
	>;
	constructor(
		private redis: Redis,
		settings: RememberedRedisSemaphoreSettings,
	) {
		this.settings = { lockOptions: defaultLockOptions, ...settings };
	}

	async acquire(key: string): Promise<() => Promise<unknown>> {
		const { redis } = this;
		const { prefix } = this.settings;
		const mutex = new Mutex(
			redis,
			new StringBuffer()
				.$If(prefix, [prefix, ':'])
				.$If(this.settings.fixedPrefix, ['REMEMBERED-SEMAPHORE:'])
				.$(key)
				.toString(),
			{
				...this.settings.lockOptions,
				onLockLost: (err) => this.settings.onLockLost?.(key, err),
			},
		);
		const acquire = mutex.acquire.bind(mutex);
		const release = mutex.release.bind(mutex);

		try {
			await acquire();
		} catch (err) {
			this.settings.onAcquireError?.(key, err);
		}

		return async () => dontWait(release);
	}
}
