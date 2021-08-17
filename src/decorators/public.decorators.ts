///// public.decorator.ts /////

import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'THIS_ROUTE_IS_PUBLIC';

// decorators are functions inside function with access to extra metadata provided
// by the JSVM (JavaScript Interpreter). So you can ovbiously call
// a decorator in a function like normal functions but just remember to `return` it to
// let the decorator's inner function to access those metadata about the class/method/parameter/property
// its currently being applied to
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

// the decorator flow-> `Public` is a function which returns & calls `SetMetadata`
// function which also returns & calls an inner function within it. Its called
// **function-currying**
// More on Wikipedia: https://en.wikipedia.org/wiki/Currying
