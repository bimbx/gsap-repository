/**
 * cc002.js
 *
 * Assumes GSAP (gsap.min.js) and SplitText (splittext.min.js) are already loaded.
 * This script waits for the HTML DOM to be fully loaded before executing.
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- SplitText Setup ---
    // Find all elements with the attribute 'data-split-lines'
    document.querySelectorAll("[data-split-lines]").forEach(element => {
      // First split: into lines, adding the class 'outer-line'
      const outerLinesSplit = new SplitText(element, {
         type: "lines",
         linesClass: "outer-line"
        });
  
      // Second split: split the *lines* from the first split into chars, words, and lines,
      // adding the class 'inner-line' and wrapping them in <span> tags.
      new SplitText(outerLinesSplit.lines, {
        type: "chars,words,lines",
        linesClass: "inner-line",
        tag: "span"
       });
  
      // Set overflow hidden on the outer lines containers (often needed for reveal animations)
      gsap.set(".outer-line", { overflow: "hidden" });
    });
  
    // --- GSAP Animation Timeline ---
    // Create a timeline with default settings
    const timeline = gsap.timeline({
      defaults: {
        duration: 1.5,      // Default duration for animations in this timeline
        ease: "power3.out"  // Default easing function
      }
    });
  
    // Add animations to the timeline
    timeline
      .fromTo(".h2",
        { y: 60, opacity: 0, filter: "blur(10px)" }, // Starting state
        { y: 0, opacity: 1, filter: "blur(0px)", stagger: 0.05 }, // Ending state + stagger
        0 // Start time offset in the timeline
      )
      .fromTo(".outer-line",
        { y: 60, opacity: 0, filter: "blur(10px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", stagger: 0.05 },
        0.1 // Start time offset
      )
      .fromTo(".cards-wrapper",
        { y: 60, opacity: 0, filter: "blur(10px)" },
        { y: 0, opacity: 1, filter: "blur(0px)" },
        0.2 // Start time offset
      )
      .fromTo(".line.is--top",
        { scaleY: 0, opacity: 0, filter: "blur(3px)" },
        { scaleY: 1, opacity: 1, transformOrigin: "top", filter: "blur(0px)" },
        0.3 // Start time offset
      )
      .fromTo(".line.is--bottom",
        { scaleY: 0, opacity: 0, filter: "blur(3px)" },
        { scaleY: 1, opacity: 1, transformOrigin: "bottom", filter: "blur(0px)" },
        0.3 // Start time offset (same as above, they run concurrently)
      );
  
    // Note: The original version used document.fonts.ready.then(() => { ... });
    // This meant it waited for fonts to load *before* running the SplitText and GSAP code.
    // Waiting for fonts can prevent layout shifts if fonts load late, but adds a delay.
    // This version (using DOMContentLoaded) runs sooner but might have minor visual
    // inconsistencies if fonts significantly alter text dimensions after SplitText runs.
  
  }); // End of DOMContentLoaded listener