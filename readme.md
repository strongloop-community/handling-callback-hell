# Handling Callback Hell
## Practical solutions to asynchronous control flow.

This example repo includes various approaches discussed in the [accompanying StrongLoop blog post on managing callback hell](http://strongloop.com/strongblog/node-js-callback-hell-promises-generators/).  It is required to run Node 0.11.x or higher for the generator examples.

All the dependencies are bundled in the project.

To run the test suite:

```sh
npm test
```

To run individual examples, run each file directly:

```sh
node nested.js
```

## Various Control Flow Approaches

1. **nested.js** - a nested approach
2. **flat.js** - a modular approach
3. **async.js** - a async module approach
4. **promise** - a promise approach
5. **generator** - a generator approach
6. **q-generator** - a promise/generator approach

Read the accompanying article for more details on the approaches.  The Q Generator was an additional approach not mentioned in the article.
