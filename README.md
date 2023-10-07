[![Actions Status](https://github.com/Codibre/remembered-redis-semaphore/workflows/build/badge.svg)](https://github.com/Codibre/remembered-redis-semaphore/actions)
[![Actions Status](https://github.com/Codibre/remembered-redis-semaphore/workflows/test/badge.svg)](https://github.com/Codibre/remembered-redis-semaphore/actions)
[![Actions Status](https://github.com/Codibre/remembered-redis-semaphore/workflows/lint/badge.svg)](https://github.com/Codibre/remembered-redis-semaphore/actions)
[![Test Coverage](https://api.codeclimate.com/v1/badges/3b88781ef0ec77d6fae0/test_coverage)](https://codeclimate.com/github/Codibre/remembered-redis-semaphore/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/3b88781ef0ec77d6fae0/maintainability)](https://codeclimate.com/github/Codibre/remembered-redis-semaphore/maintainability)
[![Packages](https://david-dm.org/Codibre/remembered-redis-semaphore.svg)](https://david-dm.org/Codibre/remembered-redis-semaphore)
[![npm version](https://badge.fury.io/js/%40remembered-redis%2Fredis-semaphore.svg)](https://badge.fury.io/js/%40remembered-redis%2Fredis-semaphore)

Remembered redis semaphore implementation, to be used with [@remembered/redis](https://www.npmjs.com/package/@remembered/redis)

## How to Install

```
npm i remembered-redis-semaphore
```

## How to use it

When instantiating **RememberedRedis**, just inform an instance os **RememberedRedisSemaphore**

```ts
const semaphore = new RememberedRedisSemaphore(IORedisIstanceForSemaphore, {

})

const remembered = new RememberedRedis({
  ttl: 200, // In milliseconds
  redisTtl: 10000 // In seconds
  semaphore,
}, IORedisInstance);
```

## License

Licensed under [MIT](https://en.wikipedia.org/wiki/MIT_License).
