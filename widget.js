/*
  SkyCards™ Profile Widget
  Usage: <script src="https://letsplaysimi.github.io/add-me-on-skycards/widget.js" data-name="YourName" data-code="1234 5678 9123"></script>
*/

(function() {
    //Data extraction and setup
    const scripts = document.getElementsByTagName('script');
    const currentScript = scripts[scripts.length - 1];
    const userName = currentScript.getAttribute('data-name') || 'Unknown User';
    const userCode = currentScript.getAttribute('data-code') || '0000 0000 0000';
    const modalId = 'skycards-modal-' + Math.floor(Math.random() * 100000);

    //Inject CSS styles
    const styles = `
        /* Font similar to SkyCards (Montserrat is a good free match) */
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800&display=swap');

        .sc-widget-container {
            font-family: 'Montserrat', sans-serif;
            display: inline-block;
            margin: 10px;
        }

        /* --- BUTTON STYLE --- */
        .sc-add-button {
            background-color: #2ECC71; /* Vibrant Green */
            color: white;
            border: 2px solid #000000; /* Distinct Black Outline */
            border-radius: 50px; /* Pillow Shape */
            padding: 12px 24px;
            font-weight: 800;
            font-size: 16px;
            text-transform: uppercase;
            cursor: pointer;
            box-shadow: 0 4px 0px rgba(0,0,0,0.2); /* Slight depth */
            transition: all 0.1s ease;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .sc-add-button:hover {
            background-color: #27AE60;
            transform: translateY(1px);
            box-shadow: 0 2px 0px rgba(0,0,0,0.2);
        }

        /* --- MODAL / POP-UP STYLE --- */
        .sc-modal-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7); /* Dark background overlay */
            z-index: 10000;
            justify-content: center;
            align-items: center;
            backdrop-filter: blur(3px); /* Optional: slight blur */
        }

        .sc-modal-content {
            background-color: #2C3E50; /* Dark Blue/Gray from image_1.png */
            color: #ECF0F1;
            width: 90%;
            max-width: 400px;
            border-radius: 20px;
            border: 2px solid #000000;
            padding: 30px;
            position: relative;
            box-shadow: 0 10px 25px rgba(0,0,0,0.5);
            text-align: center;
            box-sizing: border-box;
        }

        /* --- CLOSE "X" BUTTON --- */
        .sc-close-x {
            position: absolute;
            top: -15px;
            right: -15px;
            width: 35px;
            height: 35px;
            background-color: #FF7675; /* Pinkish-Red */
            border: 2px solid #000000;
            border-radius: 50%;
            color: white;
            font-size: 22px;
            font-weight: bold;
            line-height: 31px;
            cursor: pointer;
            text-align: center;
            box-shadow: 0 4px 0px rgba(0,0,0,0.2);
            font-size: 28px; 
            line-height: 33px; 
            font-weight: 900;
        }
        .sc-close-x:hover { background-color: #E74C3C; }

        /* --- MODAL INTERNAL CONTENT --- */
        .sc-profile-name {
            font-weight: 800;
            font-size: 24px;
            margin-bottom: 20px;
            color: white;
            text-shadow: 0 2px 0px rgba(0,0,0,0.5);
        }

        .sc-code-label {
            text-transform: uppercase;
            color: #BDC3C7;
            font-size: 12px;
            letter-spacing: 1px;
            margin-bottom: 8px;
        }

        .sc-code-box {
            background-color: rgba(0,0,0,0.3);
            border-radius: 10px;
            padding: 15px;
            font-size: 18px;
            font-weight: 700;
            letter-spacing: 1px;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;
            margin-bottom: 25px;
            border: 1px solid rgba(255,255,255,0.1);
        }

        .sc-copy-btn {
            background: none;
            border: none;
            cursor: pointer;
            opacity: 0.6;
            transition: opacity 0.2s;
            padding: 0;
            display: flex;
        }
        .sc-copy-btn:hover { opacity: 1; }

        /* --- INSTRUCTIONS (New Content) --- */
        .sc-instructions {
            text-align: left;
            font-size: 14px;
            color: #ECF0F1;
            font-weight: 700;
            line-height: 1.6;
            border-top: 1px solid rgba(255,255,255,0.1);
            padding-top: 20px;
        }
        
        .sc-instr-title {
            font-size: 16px;
            margin-bottom: 10px;
            color: white;
        }

        .sc-instructions ol {
            margin: 0;
            padding-left: 20px;
        }
        
        .sc-instructions li {
            margin-bottom: 8px;
        }

        .sc-text-outline {
            /* Standard property */
            text-stroke: 2px #000000;
            /* Webkit prefix for compatibility (Chrome, Safari, Edge, mobile browsers) */
            -webkit-text-stroke: 2px #000000;
            
            /* Optional: Improves rendering on some screens */
            paint-order: stroke fill;

            font-weight: 900;
        }
    `;

    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    // 3. Create HTML DOM elements
    
    // The button
    const container = document.createElement('div');
    container.className = 'sc-widget-container';

    const addBtn = document.createElement('button');
    addBtn.className = 'sc-add-button';
    addBtn.innerHTML = `<span class="sc-text-outline" style="display:inline-block; transform:scale(1.3);">+ ADD ME ON SKYCARDS!</span>`;
    container.appendChild(addBtn);

    // The Modal Overlay
    const overlay = document.createElement('div');
    overlay.className = 'sc-modal-overlay';
    overlay.id = modalId;

    // SVG Icons
    const copyIconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;

    // The Modal Content Window
    overlay.innerHTML = `
        <div class="sc-modal-content">
            <div class="sc-close-x" style="display:inline-block; transform:scale(1.3);" title="Close">×</div>
            
            <div class="sc-profile-name sc-text-outline">${userName}</div>
            
            <div class="sc-code-label">My Code:</div>
            <div class="sc-code-box">
                <span id="${modalId}-code-text">${userCode}</span>
                <button class="sc-copy-btn" id="${modalId}-copy-btn" title="Copy Code">
                    ${copyIconSvg}
                </button>
            </div>

            <div class="sc-instructions">
                <div class="sc-instr-title sc-text-outline">How to add me:</div>
                <ol>
                    <li class="sc-text-outline">Open the SkyCards™ App</li>
                    <li class="sc-text-outline">Tap "Friends" in the bottom right corner</li>
                    <li class="sc-text-outline">Tap "+ ADD" in the top right corner</li>
                    <li class="sc-text-outline">Paste my code</li>
                    <li class="sc-text-outline">Tap "CONNECT"</li>
                </ol>
            </div>
        </div>
    `;

    // 4. logic and event handling
    
    // Open modal
    addBtn.addEventListener('click', function() {
        overlay.style.display = 'flex';
    });

    // Close modal (clicking X)
    overlay.querySelector('.sc-close-x').addEventListener('click', function() {
        overlay.style.display = 'none';
    });

    // Close modal (clicking outside the content window)
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            overlay.style.display = 'none';
        }
    });

    // Copy Code Logic
    overlay.querySelector(`#${modalId}-copy-btn`).addEventListener('click', function() {
        const codeText = userCode.replace(/\s/g, ''); // Remove spaces for pasting
        navigator.clipboard.writeText(codeText).then(() => {
            // Optional: visual feedback (change icon color briefly)
            const btn = overlay.querySelector(`#${modalId}-copy-btn`);
            btn.style.opacity = '1';
            btn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2ECC71" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
            
            setTimeout(() => {
                btn.style.opacity = '';
                btn.innerHTML = copyIconSvg;
            }, 1500);
        });
    });

    // 5. Initialize (Place elements on the page)
    currentScript.parentNode.insertBefore(container, currentScript);
    document.body.appendChild(overlay);

})();
 
