---
title: "What people forgot about React"
summary: "As people simply generate UI, and many AI agents defaulting to React, many are taking React for granted, not realizing what it gave web frontends, and why it become an almost de facto standard among teams delivering experiences for the Web."
publishDate: "2026-08-26T00:00:00-00:00"
author: "Sal Rahman"
---

It was Monday, November 11th, 2013. Someone named Allen Pike of Steamclock software was the host of a talk series, called VanJS; it's a technology group for Vancouver Canada-based JavaScript, Node.js, and web enthusiasts. Attending it costed $5. The company that I was interning at, StrongLoop, covered my cost of admission. The first talk was by Steven Luscher, and he introduced to the audience a new open source project for frontends by Facebook: React.

Even as far back as 2013, anything new is a tough sell.

The days leading up to React's release, people have been wrangling with jQuery and various plugins. People wrote frameworks on top of jQuery. Backbone.js was released in October 13th of 2010, and shortly afterwards, AngularJS came out. Backbone.js won the hearts of those familiar with jQuery, while AngularJS boasted patterns that encouraged separation of concern, and inversion of control, ultimately, testability.

Those frameworks were almost established standards by the time React came out, so it shouldn't be any surprise why anyone would be skeptical of React. And people are still skeptical of it, as of 2026.

But Steven Luscher wasn't presenting a framework. He was presenting a library that primarily lived on the view layer in application source code, and data was merely "fed in" via the `this.setState` method.

But what made React so intriguing was that updating content on screen meant not only updating the individual components that had their contents change, but it empowered writing code that looked like it redrew the entire screen! This was enabled thanks to React's virtual DOM — an in-memory version of what could be actually on the DOM — and materializes it into the web page, but only what's changed, via a DOM diffing algorithm.

Performance-oriented veterans at that time would frown at screen redraws, favouring more fine-grained, manually hand-coded UI updates. But this came at a real cost to quality assurance for more complex UI updates. So performance-minded teams needed to plan around product updates.

So prior to React, you either had three choices:

- minimize UI updates, favouring minimal features for simpler, more easier to reason about code. Performance remained in-tact, however
- allow for more ambitious UI updates via fine-grained coding choices, but giving up code simplicity, risking bugs. Performance still remained in-tact
- redraw the entire screen, allowing for more complex UI, keeping simpler code, but sacrificing performance

With React, we never had to pick any two of interactivity, code simplicity, or performance, since React gave us all three.

Steven Luscher demonstrated performance, by drawing a grid of divs, each representing a pixel of a live-updating phase-shifting sine curve.

The React-less "redraw everything" demo showed poor performance.

The React one showed real-time rendering.

People were excited.

And I was especially excited. So much so, I ended up createing the [/r/reactjs](https://reddit.com/r/reactjs) subreddit.

## What this means

Some rather astute observer would have looked at the problem of writing web UI during web's mid-2000s boom pre-React, and would have concluded that UI application state is merely a change over time.

That would not have been a novel idea. This insight has been documented repeatedly. The "observer pattern" by the "Gang of Four" in 1994 is a good example. _Out of the Tarpit_ in 2006 made mention of "state merely being derived".

Even 1943, we had the idea of global state merely being an update in response to an input, and we've invented the "finite state automaton", or "finite state machine".

Combining that, we see that UI can be modeled easily as an FSA/FSM.

And that's the idea of those that opted to "just redraw everything"; upon an input, internal state updates, UI looks different. Rinse-and-repeat.

For more product-oriented stakeholders, state transition provides a bird's-eye-view. Designers merely model applications as state, state transitions, and UI state, allowing the act of detailing out a rather high-level overview of application behaviour, before writing a single line of code.

And thus, UI is merely a finite state automaton.

Prior to React, the FSA/FSM approach came with a sacrifice of quality, delivery cadence, performance, or any combination of the 3.

React derisked an FSA/FSM-like architecture entirely, empowering product people to merely provide screens and screen transitions, giving frontend engineers a blueprint to build a product relatively quickly.

## My own experience

Although React does allow for turning high-level designs to working software, while also allowing for quick turnarounds for iterations and pivots to meet business' needs, React's core DOM diffing algorithm allows for more interactivity, beyond just transitioning from view to view, all without sacrificing performance.

This fact alone isn't merely a demo — such as that of Steven Luscher sine wave mapped to large blocky pixels made from DIVs demo.

I've actually implemented something like this over at StageKeep. It presented an interaction similar to Figma. Fast, buttery smooth panning and zooming. Interactions once believed to be limited to WebGL and shaders done entirely in SVG by synthesizing coordinates and and zoom value into a 2D grid.

It was insanely elegant.

![Screenshot of a digital stage choreography and blocking tool displaying a grid layout with performers mapped as red and blue geometric icons, transition path arrows, a formations list on the left, and an audio timeline with formation keyframes along the bottom.](https://salrahman.com/stagekeep-image.png)

## In Conclusion

React merely isn't just a fad. It's not merely a preference. It's a critical tool for translating business requirements into feature rich, accessible user experiences, with a faster delivery cadence.

It not only made it faster to transition from screen to screen, but deeply interactive applications with screen content updates happening at animation speeds. Shameless plug: I used React to build StageKeep.
