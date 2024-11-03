---
title: "On ephemerality and code readability"
summary: "Does code really need to be readable, all the time?"
publishDate: "2024-11-01T00:00:00-07:00"
author: "Sal Rahman"
---

I'd often hear about the virtues of writing readable code ever since I first started learning to program back in 2006.

Compared to today, blogging was both at its infancy, but still really taking off, with no plateau in sight. There were many ways I'd read about programming, and it's through link aggregation services that I'd stumble upon various programming blog posts, and one of the oft-repeated advice that I'd encounter is the advice that one should write code that is easy to read.

Hence why every once in a while, I'd encounter the quote "programs must be written for people to read, and only incidentally for machines to execute" by Harold Abelson.

As I progressed into my programming career, it was the same drill: take requirements, and turn it into functioning software, with as minimal bugs as possible. Supposedly code that is easy to read is minimal of bugs, at least in the event that the code is handed off to someone.

Back in 2012, one framework that was lauded as the panacea for frontend development was Backbone.js, a framework that brought the MVC paradigm to thick client development. Dropping-in the library into the very start of a project paved the way on how to best structure code to not only deliver software, but one that is minimal of bugs.

To me, it felt revolutionary at that time, but there really wasn't much innovation in this library. It was just a handful of classes that provided an event handler to data changes, propagating data changes from collections to views. Nothing that couldn't be implemented on our own. However, having a common framework that many use is much easier to hire for, so that's a bonus.

2013 is what sparked the beginning of a new era. The developers of Facebook had open sourced React, the front-end framework that was internally worked on and deployed at Instagram.

Although, it's unclear if it took ideas from Backbone.js, but it did revolutionize how to think about the state update and re-render cycle. There were many paradigms to be drawn from Backbone.js, but React was also different in many ways.

While Backbone.js relied heavily on singleton instances of models and collections, React had no such hard requirements. You decided when React should trigger a view refresh. Better yet, you decided on what sub-tree to focus on. But if you wanted to redraw the entire tree, you could do so, with minimal performance penalty! This is a luxury not immediately available with Backbone.js.

While Backbone.js held your hand at how to structure your code, it provided no mechanism for changes to the view. React flipped the script; you are free to maintain your own state management paradigm, but the view rendering is something that React took over for the most part.

Backbone.js required you to build the actual DOM tree on your own (albeit, it did have templating facilities so that you didn't entirely have to). React forced you to work almost entirely with its virtual DOM system, somewhat. Actually, React borrowed ideas from functional programming and functional reactive programming (probably where the name "React" came from). Sure, you don't build the browser DOM tree yourself. Instead, you build a virtual DOM tree, that is then mapped one-to-one to the actual DOM layout. But once it has been laid out, you can grab the reference element, and do what you want to your heart's content. So you initialized an HTML5 canvas element, and want to draw to it? Once it has been laid out onto the DOM tree from the virtual DOM, React will allow you to gain access to it afterwards via references.

With this in mind, it felt as though React empowered you to focus more on the business logic, while it took over rendering for you. Although _some_ applications would benefit greatly from the ability to manipulate the DOM directly, _most_ applications will benefit more from delegating rendering, while allowing one to focus on the business logic (bear in mind, as mentioned earlier, React doesn't necessarily stop you from manipulating the DOM. It even has features that allow you to gain access to the DOM. However, DOM manipulation still feels like it's been buried away somewhere, and you have to go look for it, unlike Backbone.js).

And this brings me to my thesis on "ephemerality of code".

## Readable Code

I talked about the time span from 2006 to mid 2010s. It wasn't until 2016 when React really took off. The entire time when I was writing React, I'd feel writing readable code was perhaps a thing of the past.

It's 2024, and I still hear the virtues of writing readable code.

I am not going to deny that readable code makes a lot of sense.

Depending on the problem domain, writing readable code is probably a critical part of a software developer's job. It's almost as if they need to be going a step above Harold Abelson's quote, and actually treat the human brain that reads code as a CPU architecture to target, and incidentally be compiled to run on ARM64 sometimes.

But there are other problem domains that I simply find this strategy is not a valuable use of one's time.

And the case being is writing code in React.

## Code ephemerality

Let's really not forget one thing about software development: we're building something for people.

Many salaried people may cynically point out that they are being paid to turn a profit.

That is true. But one can't just take money from people in exchange for nothing, lest you want to be accused of stealing or committing fraud. People need to see value, in order to be convinced that they should forfeit their money for the privilege of using the product.

The thing is, people's needs change, and to reflect their needs, what the front-end presents to users also needs to change.

This is why code needs to be ephemeral.

This is why being proud of React code is a pointless endeavour.

As more and more people move away from writing raw CSS, and onto writing CSS directly into the JavaScript/TypeScript, the whole concept of writing "beautiful code" has been turned on its head.

Now, things are going even crazier with Tailwind. Previously, each style attribute was placed on individual lines; now they can span several page worth of horizontal scrolling to see the full styling rule.

It's awful. It's great developer experience when developing, but terrible when maintaining.

And that's OK.

Because in the end of the day, ephemerality of code makes all of this moot.

The life of the code should be the life of the specific iteration of your software.

## Free yourself

Previously, I remember there being a strong emphasis on readable code, while balancing functionality.

But considering the competitive nature of SaaS, it probably doesn't make sense to be stuck splitting hairs.

It's also that I'm beginning to see a shift in attitudes of software development as a profession. Many have grown to value work-life balance.

For a long time, sacrificing one's health for long hours was a virtue worth cherishing. But now, people cherish work-life balance. They focus on work for 40 hours, and live their life for the remaining 128 hours.

Hence why nicely structured code doesn't really matter much. It will all get thrown away anyways.

So what should one focus on during their 8 hours of work? Just build and ship things.

## Surely there is a time for clean code…

Of course you shouldn't be writing half-thought out code all the time.

So when is it the appropriate time to write clean code?

Definitely not the front-end.

Business logic should probably be very clean. It should also be unit tested. Then integration tested for further sanity checks.

Some protocol-level stuff should really be well-documented and put into neatly-packed functions and classes.

## Why those should be "dirty code", too

The headline bit misleading. Of course have them be clean.

But for many, clean code is trying to model things as prototypes for future objects, and opaquely model their behaviour, all wrapped up in a black box.

People love this approach since these opaque implementation encapsulate behaviour, with a focus more on the interfaces instead of the implementation. Furthermore, if objects lack behaviour, they're often regarded as "anemic types". The presence of "anemic type" is a code smell, for many.

But why the fear and disdain for anemic types? If we're writing for embedded devices, sure, minimzing stack space and heap allocations is probably a wise approach to coding. But on web browsers, it's fine to generate a type who's sole purpose is to transfer data from entity to entity. It's all going to get garbage-collected anyways.

## Code as configuration

Software solves business problems.

One of the biggest benefit of software is that it does exactly what it is told to do (yes even bugs. The software is not at fault for being buggy; it's who wrote it). It doesn't take breaks, and can potentially work 24/7. Sure, it is subject to the weakest part of the system it runs under, and hence why a lot of SaaS products have an uptime measured in "nines". These numbers are so high (but not exactly 100%), they may as well be 100% as far as UX is concerned.

And yet, for a lot of business cases, the same piece of code may not live forever. It could have, but business requirements will push out the old, and bring in the new.

And hence comes the idea of code as configuration.

Business has new requirements?

If you bought off-the-shelf software that does pretty much what it needs to do (such as file servers), you simply had to update the `.htaccess` file. It's code that isn't Turing-complete like Python or JavaScript. It's configuration.

But those are so limited in what they offer.

This is where turing-completeness comes in.

Instead of working in a DSL, you work with an actual Turing-complete programming language.

Want the power of Nginx, but control the computing environment? Just import Caddy into a Go project and module that.

Likewise for React frontends.

Some changes may require some CSS updates. But others could require rethinking the UX flow.

This is where the rewrite happens. Not because someone wanted to refactor to a brand new "good practice" they read about on the Internet, but because the old component no longer served customers optimally, and it's time for an overhaul.

Situations like these are fairly common.

## Ephemerality and AI

This brings me to AI.

Google's CEO, Sundar Pichai, boasted about how more than a quarter of the company's [new code is created by AI](https://archive.is/X43PU#selection-1687.0-1687.78).

Many found this concerning.

"Is AI taking my job?", some wondered.

Many didn't ask, and instead went straight to questioning these metrics.

Could the CEO be lying? Or maybe he's telling the truth. But what's the quality like of the code that is written?

A lot of commenters highlighted how there used to be living people maintaining guardianship of the code that they write. What will the situation be like going forward? Couldn't this lead to more bugs?

I've never worked at Google, so I honestly can't comment on what's going on there.

But I can comment on something that I am much more familiar with: AI-generated code that I deliver in my work.

Sure, a lot of the code that I need to deliver is entirely inappropriate to be written by an AI. Examples of this would be a lot of backend code. I need to maintain a close watchful eye of what I am writing, favouring immutability. Go is not an immutable language by default. And AI-generated code that I ask to produce often introduces lots of mutations that are far too excessive for my liking.

Mutability is fine, but this comes at the cost of being able to reason about the code.

So if AI sucks for backend, then what is it good for?

Definitely React frontends!

## Conclusion

So SaaS as a business has become competitive. Not only in terms of the sheer number of offerings on the market, but surprisingly, there's just not enough labour going around. The market has shifted towards favouring high code velocity, and with it comes the sacrifice of code cleanliness. Employers are pushing developers to ship quickly, while doing all they can to retain talent. Someone writes code, they leave, someone takes over.

What should that person do? Just rewrite.
