# Learning Nest.js

## Additional Readings
- Design Patterns: The Decorator Pattern -> https://medium.com/better-programming/decorator-pattern-4f92897e4b4
- Scopes -> https://docs.nestjs.com/controllers
- RxJS, observable streams -> https://rxjs-dev.firebaseapp.com/guide/overview
- Inversion of Control (IoC) -> https://stackoverflow.com/questions/3058/what-is-inversion-of-control
- Fluent interface
- Exploring EcmaScript Decorators -> https://medium.com/google-developers/exploring-es7-decorators-76ecb65fb841
- Attach user details to request object -> https://github.com/nestjs/nest/issues/1634#issuecomment-472553863

---

## Setup

> nest new project-name

The `project` directory will be created, node modules and a few other boilterplate files will be installed, 
and a `src/` directory will be created and populated with several core files.

---

## Controllers

- Routing
- Request object
- Resources
- Route wildcards
- Status code
- Headers
- Redirection
- Route parameters
- Sub-Domain Routing
- Scopes
- Asynchronicity
- Request payloads
	- DTO (Data Transfer Object)
- Handling errors
- Library-specific approach

---

## Providers

- Services
- Dependency injection
- Scopes
- Custom providers
- Optional providers
- Property-based injection
- Provider registration
- Manual instantiation

---

## Module

- Feature modules
- Shared modules
- Module re-exporting
- Dependency injection
- Global modules
- Dynamic modules

---

## Middleware

- Dependency injection
- Applying middleware -> using `configure()` method of the module class.
	- restrict a middleware to a particular request method -> passing `{ path: xxx, method: RequestMethod.xxx }` to the `forRoutes()` method.
	- Route wildcard -> pattern based routes are supported as well.
- Middleware consumer
	- the `forRoutes()` method can take a single string, multiple string, a `RouteInfo` object, a controller class and even multiple controller classes.
	- the `apply()` method either take a single middleware, or multiple arguments to specify multiple middlewares.
- Excluding routes -> exclude certain routes with the `exclude()` method.
- Functional middleware -> just define it in a simple function instead of a class.
	- using the simpler functional middleware alternative any time your middleware doesn't need any dependencies.
- Multiple middleware -> simply provide a comma separated list inside the `apply()` method.
- Global middleware

--- 

## Exception filters

- Throwing standard exceptions
	- `HttpException` class -> constructor takes 2 required arguments '(response, status)'
- Custom exceptions -> custom exceptions inherit from the base `HttpException` class.
- Built-in HTTP exceptions -> these are exposed from the `@nestjs/common` package.
- Exception filters
	- **full control** over the exceptions layer.
- Binding filters -> use `@UseFilters()` decorator.
	- Exception filters can be scoped at different levels: 'method-scoped', 'controller-scoped', or 'global-scoped'.
	- To create a global-scoped filter, you setup in the `main.ts` file
		- `app.useGlobalFilters(new HttpExceptionFilter())`
	- In terms of dependency injection, global filters registered from outside of any module cannot inject dependencies since this is done outside the context of any module. In order to solve this issue, you can register a global-scoped filter **directly from any module**.
- Catch everything -> leave the `@Catch()` decorator's parameter list empty.
- Inheritance -> extend the built-in default **global exception filter**, and override the behavior based on certain factors.

---

## Pipes

- Hint
	- Pipes run inside the exceptions zone.
- Pipes have two typical use cases:	**transformation** and **validation**
	- In both cases, pipes operate on the `arguments` being processed by a controller route handler.
- Built-in-pipes -> Nest comes with six pipes available out-of-the-box.
	- `ValidationPipe`
	- `ParseIntPipe`
	- `ParseBoolPipe`
	- `ParseArrayPipe`
	- `ParseUUIDPipe`
	- `DefaultValuePipe`
- Binding pipes -> bind an instance of the pipe class to the appropriate context.
	- Passing an in-place instance is useful if we want to customize the built-in pipe's behavior by passing option.
- Custom pipes
- Schema based validation
	- create a **validator class** and delegate the task there.
- Object schema validation
	- The `joi` library allows you to create schemas in a straightforward way, with a readable API.
		- `npm install --save joi`, `npm install --save-dev @types/joi`
		- document: https://joi.dev/api/?v=17.4.0
- Binding validation pipes -> using the `@UsePipes()` decorator.
- Class validator
	- an alternative implementation for validation.
- Global scoped pipes
- Transformation use case -> a pipe can also **transform** the input data to the desired format.
	- When is this useful?
		- sometimes the data passed from the client needs to undergo some change - for example converting a string to an integetr - before it can be properly handled by the route handler method.
		- Futhermore, some required data fields may be missing, and we would like to apply default values. 
	- Another useful transformation case would be to select an **existing user** entity from the database using an id supplied in the request.
- Providing defaults
	- `Parse*` pipes expect a parameter's value to be defined. They throw an exception upon receiving `null` or `undefined` values.
	- To allow an endpoint to handle missing querystring parameter values, we have to provide a default value to be injected before the `Parse*` pipes operate on these values.

---

## Guards

Guards have a **single responsibility**. They determine whether a given request will be handled by the route handler or not.

- Hint
	- Guards are executed 'after' each middleware, but 'before' any interceptor or pipe.
- Authorization guard
	- extract and validate token, and use the extracted information to determine wheter the request can proceed or not.
- Role-based authentication
- Binding guards
- Setting roles per handler

---

## Interceptors

- Basics
	- Each interceptor implements the `intercept()` method, which takes two arguments.
		1. `ExecutionContext`
		2. `CallHandler`
			- implements the `handle()` method, which you can use to invoke the route handler method at some point in your interceptor.
	- `intercept()` method effectively **wraps** the request/response stream. As a result, you may implement custom logic **both before and after** the execution of the final route handler.
	- `handle()` method return an `Observable` -> use `RxJS` operators to further manipulate the response.
	- the invocation of the route handler is called a `Pointcut`, indicating that it's the point at which our additional logic is inserted.
- Aspect interception
- Binding interceptors
	- controller-scoped, method-scoped, or global-scoped.
- Response mapping
	- `handle()` returns an `Observable`. The stream contains the value **returned** from the route handler, and thus we can easily mutate it using RxJS's `map()` operator.
	- WARNING: The response mapping feature doesn't work with the library-specific response strategy.
	- Interceptors have great value in creating re-usable solutions to requirements that occur across an entire application.
- Exception mapping
	- take advantage of RxJS's `catchError()` operator to override thrown exceptions.
- Stream overriding
	- implement a cache to improve response time -> **cache interceptor**
	- When someone calls an endpoint that make use of `CacheInterceptor`, the response will be returned immediately.
	- In order to create a generic solution, you can take advantage of `Reflector` and create a custome decorator.
- More operators
	- handle **timeoutes** on route requests.

---

## Custom decorators

> A decorator is simply a way of wrapping one piece of code with another - literally "decorating" it.

- Param decorators
- Passing data
	- When the behavior of your decorator depends on some conditions, you can use the `data` parameter to pass an argement to the decorator's factory function.
- Working with pipes
	- Nest treats custorm param decorators in the same fashion as the built-in ones (`@Body()`, `@Param()` and `@Query()`). 
- Decorator composition
	- Nest provides a helper method to compose multiple decorators. For example, suppose you want to combine all decorators related authentication into a single decorator.

---

