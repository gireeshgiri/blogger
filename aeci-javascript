/* accordion-expand-collapse-using-inline-javascript */
// NONE of these scripts are required unless you require the extra functionality
// Purposefully ES5 for compatability
// Next version will combine the functionality into a single extendable function


// Optional: Extend inline functionality to include expand by URI fragment id

(function(){
  "use strict";

  function getAccordionObj(id) {
    var btn = document.querySelector("[aria-controls='" + id + "']"),
        panel = document.getElementById(id),
        parentId, parentPanel, parentBtn;

    if (!(panel && btn)) return false;

    parentId = btn.getAttribute("data-accordion-embedded");
    parentBtn = document.querySelector("[aria-controls='" + parentId + "']");
    parentPanel = document.getElementById(parentId);

    return {
      id: id,
      btn: btn,
      panel: panel,
      parentBtn: parentBtn,
      parentPanel: parentPanel
    }
  }
  
  function setExpanded(accordion) {

    function expand(panel, btn) {
      if (panel && btn) {
        btn.setAttribute("aria-expanded", true);
        panel.setAttribute("aria-hidden", false);
        panel.setAttribute('style', 'max-height:none; transition:none;');
      }
    }
    
    expand(accordion.parentPanel, accordion.parentBtn);
    expand(accordion.panel, accordion.btn);
  }

  function setMaxHeight(panel) {
    if (panel) {
      panel.setAttribute('style', 'max-height:' + panel.scrollHeight + 'px');
    }
  }

  function scrollToButton(accordion) {
    // Allow time for the browser to naturally scroll to the fragement ID, then afterwards scroll the "activation" button to the top of the viewport.
    setTimeout(function(){
      accordion.btn.scrollIntoView({block: 'start', behavior: 'smooth', inline: 'nearest'});
      setMaxHeight(accordion.panel);
      setMaxHeight(accordion.parentPanel);
    }, 250);
  }

  var accordion = getAccordionObj(window.location.hash.substr(1));
  if (!(accordion && accordion.panel && accordion.btn)) return false;

  setExpanded(accordion);
  scrollToButton(accordion);

})();


// Optional: on clicking button scroll it to the top of the page

(function() {
  "use strict";

  function scrollBtnToViewportTop(e) {
    var btn = e.target;
    var panel = document.getElementById(btn.getAttribute("aria-controls"));

    // Only when expanding a content block. It's irritating when collapsing a block.
    if (!(panel && btn.getAttribute("aria-expanded") === "true")) return;
    
    // Opt out
    if (btn.hasAttribute("data-accordion-noscroll")) return;

    // Requires IE10+
    panel.addEventListener("transitionend", function(){
      btn.scrollIntoView({block: 'start', behavior: 'smooth', inline: "nearest"});
    }, {once: true});
  }

  var btns = document.querySelectorAll("button[aria-expanded][aria-controls]"),
      i = btns.length;
  while (i--) {
    btns[i].addEventListener("click", scrollBtnToViewportTop, false);
  }

})();



// Optional: accordion with an embedded accordion
(function() {
  "use strict";

  function embeddedClick(e) {
    var btn = e.target,
        panel = document.getElementById(btn.getAttribute('aria-controls')),
        parentPanel = document.getElementById(btn.getAttribute("data-accordion-embedded"));

    if (!(parentPanel && panel && btn.getAttribute("aria-expanded") === "true")) return;

    // Problem is the parent block inline style max-height - So reset it.
    var newParentHeight = parentPanel.offsetHeight + parseInt(panel.style.maxHeight, 10);
    
    parentPanel.setAttribute("style", "max-height:" + newParentHeight + 'px');

  }

  var embeddedExpandBtns = document.querySelectorAll("button[aria-expanded][aria-controls][data-accordion-embedded]"),
      i = embeddedExpandBtns.length;
  while (i--) {
    embeddedExpandBtns[i].addEventListener("click", embeddedClick, false);
  }
})();



// Optional: open accordion from an inline link
// Pretty much the same as "open from URL"

(function() {
  "use strict";

  function getAccordionObj(id) {
    var btn = document.querySelector("[aria-controls='" + id + "']"),
        panel = document.getElementById(id),
        parentId,
        parentPanel,
        parentBtn;
    if (!(btn && panel)) return false;
    parentId = btn.getAttribute("data-accordion-embedded");
    parentBtn = document.querySelector("[aria-controls='" + parentId + "']");
    parentPanel = document.getElementById(parentId);
    return {
      id: id,
      btn: btn,
      panel: panel,
      parentBtn: parentBtn,
      parentPanel: parentPanel
    }
  }

  function setExpanded(accordion) {

    function expand(panel, btn) {
      if (panel && btn) {
        btn.setAttribute("aria-expanded", true);
        panel.setAttribute("aria-hidden", false);
        panel.setAttribute('style', 'max-height:none; transition:none;');
      }
    }

    expand(accordion.parentPanel, accordion.parentBtn);
    expand(accordion.panel, accordion.btn);
  }

  function setMaxHeight(panel) {
    if (panel) {
      panel.setAttribute('style', 'max-height:' + panel.scrollHeight + 'px');
    }
  }

  function scrollToButton(accordion) {
    setTimeout(function(){
      accordion.btn.scrollIntoView({block: 'start', behavior: 'smooth', inline: 'nearest'});
      setMaxHeight(accordion.panel);
      setMaxHeight(accordion.parentPanel);
    }, 10);
  }

  function openFromAnchor(e) {
    var id = e.target.panelId,
        accordion = getAccordionObj(id);
    if (!(accordion && accordion.panel && accordion.btn)) return false;
    setExpanded(accordion);
    scrollToButton(accordion);
  }

  // Get list of inline links which anchor to accordion panels
  var inlineLinks = document.querySelectorAll('a[href^="#"]'),
      i = inlineLinks.length,
      panel,
      id;
  while (i--) {
    id = inlineLinks[i].href.slice(inlineLinks[i].href.search("#") + 1);
    panel = document.getElementById(id);
    if (panel && panel.hasAttribute("aria-hidden")) {
      inlineLinks[i].panelId = id;
      inlineLinks[i].addEventListener("click", openFromAnchor, false);
    }
  }

})();





// Optional: Close all expanded blocks and expand just the one associated to the button
// Note: Doesn't work with accordions embedded inside accordions
(function(btnClass) {
  "use strict";
  
  // Requires the inline button onclick to set max-heights
  
  function collapseAll() {
    var contentBlock,
        allExpandedBtns = document.querySelectorAll("." + btnClass + "[aria-expanded='true']"),
        i = allExpandedBtns.length;

    while (i--) {
      contentBlock = document.getElementById(allExpandedBtns[i].getAttribute("aria-controls"));
      if (contentBlock) {
        allExpandedBtns[i].setAttribute("aria-expanded", false);
        contentBlock.setAttribute("aria-hidden", true);
      }
    }
  }
  
  function expandThis(btn) {
    var contentBlock = document.getElementById(btn.getAttribute("aria-controls"));
    if (!contentBlock) return;
    btn.setAttribute("aria-expanded", true);
    contentBlock.setAttribute("aria-hidden", false);
  }
  
  function togglerBtnClicked(e) {
    collapseAll();
    expandThis(e.target);
  }
  
  var expandBtns = document.querySelectorAll("." + btnClass + "[aria-expanded]");
  var i = expandBtns.length;
  while (i--) {
    expandBtns[i].addEventListener("click", togglerBtnClicked, false);
  }

})("toggler_btn-solo"); // Change this class name to "toggler_btn" to see it in action


/* Prism - is used for code highlighting from an external pen: https://codepen.io/2kool2/pen/MEbeEg */
