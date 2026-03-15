(function() {
    // Define the Custom Element
    customElements.define('sky-cards', class extends HTMLElement {
        connectedCallback() {
            const userName = this.getAttribute('name') || 'Unknown User';
            const userCode = this.getAttribute('code') || '0000 0000 0000';
            const modalId = 'sc-modal-' + Math.random().toString(36).substr(2, 9);

            // 1. Inject Styles (Only once per page)
            if (!document.getElementById('skycards-global-styles')) {
                const styleSheet = document.createElement("style");
                styleSheet.id = 'skycards-global-styles';
                styleSheet.innerText = `
                    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&display=swap');
                    .sc-widget-container { font-family: 'Montserrat', sans-serif; display: inline-block; }
                    .sc-add-button { 
                        background-color: #2ECC71; color: white; border: 2px solid #000; 
                        border-radius: 50px; padding: 5px 30px; min-width: 250px; 
                        display: flex; justify-content: center; align-items: center; 
                        font-weight: 900; cursor: pointer; box-shadow: 0 4px 0px rgba(0,0,0,0.2);
                        line-height: 1; overflow: visible;
                        padding: 5px 30px;
                        min-width: 300px;
                    }
                    .sc-add-button span { display: inline-block; transform: scale(1.3); white-space: nowrap; }
                    .sc-text-outline { -webkit-text-stroke: 2px #000; paint-order: stroke fill; font-weight: 900; }
                    
                    /* Modal Styles */
                    .sc-modal-overlay { 
                        display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
                        background: rgba(0,0,0,0.7); z-index: 10000; justify-content: center; align-items: center; 
                    }
                    .sc-modal-content { 
                        background: #2C3E50; color: white; padding: 30px; border-radius: 20px; 
                        border: 2px solid #000; position: relative; text-align: center; width: 90%; max-width: 400px; 
                    }
                    .sc-close-x { 
                        position: absolute; top: -15px; right: -15px; width: 35px; height: 35px; 
                        background: #FF7675; border: 2px solid #000; border-radius: 50%; 
                        cursor: pointer; font-size: 28px; line-height: 33px; font-weight: 900;
                    }
                    .sc-code-box { background: rgba(0,0,0,0.3); padding: 15px; border-radius: 10px; margin: 20px 0; display: flex; justify-content: center; gap: 10px; }
                    .sc-instructions { text-align: left; font-size: 14px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 15px; }
                `;
                document.head.appendChild(styleSheet);
            }

            // 2. Create the Button HTML
            this.innerHTML = `
                <div class="sc-widget-container">
                    <button class="sc-add-button">
                        <span class="sc-text-outline">+ ADD ME ON SKYCARDS! </span>
                    </button>
                </div>
            `;

            // 3. Create the Modal (Append to body so it's not clipped)
            const overlay = document.createElement('div');
            overlay.className = 'sc-modal-overlay';
            overlay.innerHTML = `
                <div class="sc-modal-content">
                    <div class="sc-close-x">×</div>
                    <div style="font-size: 24px; margin-bottom: 20px;" class="sc-text-outline">${userName}</div>
                    <div class="sc-code-box">
                        <span>${userCode}</span>
                    </button>
                    </div>
                    <div class="sc-instructions">
                        <div class="sc-text-outline" style="margin-bottom: 10px;">How to add me:</div>
                        <ol>
                            <li class="sc-text-outline">Open SkyCards™</li>
                            <li class="sc-text-outline">Tap "Friends"</li>
                            <li class="sc-text-outline">Tap "+ ADD"</li>
                            <li class="sc-text-outline">Paste Code & Connect</li>
                        </ol>
                    </div>
                </div>
            `;
            document.body.appendChild(overlay);

            // 4. Events
            this.querySelector('.sc-add-button').onclick = () => overlay.style.display = 'flex';
            overlay.querySelector('.sc-close-x').onclick = () => overlay.style.display = 'none';
            overlay.onclick = (e) => { if(e.target === overlay) overlay.style.display = 'none'; };
        }
    });
})();