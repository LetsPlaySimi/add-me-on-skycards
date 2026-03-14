(function() {
    // 1. Find the script tag that is currently running
    const scripts = document.getElementsByTagName('script');
    const currentScript = scripts[scripts.length - 1];

    // 2. Pull the "Name" and "Code" from the attributes
    const name = currentScript.getAttribute('data-name') || 'Unknown';
    const code = currentScript.getAttribute('data-code') || 'No Code';

    // 3. Create the button element
    const btn = document.createElement('button');
    btn.innerHTML = `Click for ${name}`;
    btn.style.padding = "10px 20px";
    btn.style.cursor = "pointer";

    // 4. Define what happens on click (The Pop-up)
    btn.onclick = function() {
        alert("Name: " + name + "\nCode: " + code);
    };

    // 5. Insert the button right before the script tag
    currentScript.parentNode.insertBefore(btn, currentScript);
})();
