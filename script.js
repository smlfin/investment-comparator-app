// Increment CACHE_NAME for Service Worker update to force fresh load of ALL files
const CACHE_NAME = 'investment-comparator-v18'; // NEW VERSION (Calculator logic fix, Download content & placement, Data text updates)
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json',
  // Add your icon paths here:
  './icons/icon-72x72.png',
  './icons/icon-96x96.png',
  './icons/icon-128x128.png',
  './icons/icon-144x144.png',
  './icons/icon-152x152.png',
  './icons/icon-192x192.png',
  './icons/icon-384x384.png',
  './icons/icon-512x512.png',
  // Add CDN paths for cached offline use
  'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js',
  'https://cdn.jsdelivr.net/npm/html-to-image@1.11.1/dist/html-to-image.min.js'
];

// Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  });
}

const investmentData = {
    "SML Finance Ltd": {
        "SD 5.5 Year": [
            { "monthly": "12.5%", "yearly": "13.0%", "period": "5.5 YEARS", "remarks": "5000 and Above", "generalRemark": "No Premature Closing Allowed" }, // Changed remarks
            { "monthly": "13.0%", "yearly": "13.5%", "period": "5.5 YEARS", "remarks": "5 LAKHS to less than 25 LAKHS", "generalRemark": "No Premature Closing Allowed" }, // Changed remarks
            { "monthly": "14.0%", "yearly": "14.5%", "period": "5.5 YEARS", "remarks": "25 LAKHS and Above", "generalRemark": "No Premature Closing Allowed" } // Changed remarks
        ],
        "Doubling Scheme": [
            { "period": "6 YEARS", "remarks": "5000 and Above", "doublingRemark": "Doubles on maturity.", "generalRemark": "No Premature Closing Allowed" } // Changed remarks
        ],
        "Non-Convertible Debentures (NCD)": [
            {
                "monthly": "12.5%",
                "yearly": "Not Available",
                "period": "10 YEARS",
                "remarks": "Between 3 Lakhs to less than 15 Lakhs", // SML NCD Option 1
                "closureRemark": "Closure allowed after 1 year.",
                "closureTerms": [
                    { "period": "Between 1 & 2 year", "cut": "1%" },
                    { "period": "Between 2 & 3 year", "cut": ".50%" },
                    { "period": "After 3 year", "cut": "No cut" },
                    { "period": "If closed after 3 years between 2 Anniversary years", "cut": "Effective Rate: 9%" } // Updated term
                ]
            },
            {
                "monthly": "13%", // Assuming 13% for above 15 Lakhs
                "yearly": "Not Available",
                "period": "10 YEARS",
                "remarks": "15 Lakhs and Above", // SML NCD Option 2
                "closureRemark": "Closure allowed after 1 year.",
                "closureTerms": [
                    { "period": "Between 1 & 2 year", "cut": "1%" },
                    { "period": "Between 2 & 3 year", "cut": ".50%" },
                    { "period": "After 3 year", "cut": "No cut" },
                    { "period": "If closed after 3 years between 2 Anniversary years", "cut": "Effective Rate: 9%" } // Updated term
                ]
            }
        ]
    },
    "Vanchinad Finance (P) Ltd": {
        "SD 5.5 Year": [
            { "monthly": "12.5%", "yearly": "13.0%", "period": "5.5 YEARS", "remarks": "5000 and Above", "generalRemark": "No Premature Closing Allowed" }, // Changed remarks
            { "monthly": "13.0%", "yearly": "13.5%", "period": "5.5 YEARS", "remarks": "5 LAKHS to less than 25 LAKHS", "generalRemark": "No Premature Closing Allowed" }, // Changed remarks
            { "monthly": "14.0%", "yearly": "14.5%", "period": "5.5 YEARS", "remarks": "25 LAKHS and Above", "generalRemark": "No Premature Closing Allowed" } // Changed remarks
        ],
        "Sub - ordinated Debt Doubling Scheme": [
            { "period": "6 YEARS", "remarks": "5000 and Above", "doublingRemark": "Doubles on maturity.", "generalRemark": "No Premature Closing Allowed" } // Changed remarks
        ],
        "Non-Convertible Debentures (NCD)": [
            // Keeping the structure, but message will indicate unavailability
            {
                "monthly": "12.5%",
                "yearly": "13.0%",
                "period": "10 YEARS",
                "remarks": "5 LAKHS to less than 15 LAKH",
                "closureRemark": "Closure allowed after 1 year.",
                "closureTerms": [
                    { "period": "Between 1 & 2 year", "cut": "2%" },
                    { "period": "Between 2 & 3 year", "cut": "1%" },
                    { "period": "After 3 year", "cut": "No cut" },
                    { "period": "If closed after 3 years between 2 Anniversary years", "cut": "Effective Rate: 9%" } // Updated term
                ]
            },
            {
                "monthly": "13.0%",
                "yearly": "13.5%",
                "period": "10 YEARS",
                "remarks": "15 LAKH and Above",
                "closureRemark": "Closure allowed after 1 year.",
                "closureTerms": [
                    { "period": "Between 1 & 2 year", "cut": "2%" },
                    { "period": "Between 2 & 3 year", "cut": "1%" },
                    { "period": "After 3 year", "cut": "No cut" },
                    { "period": "If closed after 3 years between 2 Anniversary years", "cut": "Effective Rate: 9%" } // Updated term
                ]
            }
        ]
    },
    "SANGEETH NIDHI": {
        "Sangeeth Nidhi Deposits": [
            { "period": "6 MONTHS < 1 YEAR", "yearly": "9%", "remarks": "5000 and Above" },
            { "period": "1 YEAR < 5 YEAR", "monthly": "12%", "yearly": "12.50%", "remarks": "5000 and Above" }
        ]
    }
};

// DOM Elements
const companySelect = document.getElementById('company-select');
const productSelect = document.getElementById('product-select');
const selectedCompanyNameDiv = document.getElementById('selected-company-name');
const selectedProductNameDiv = document.getElementById('selected-product-name');
const productDetailsDiv = document.getElementById('product-details');

const investmentAmountInput = document.getElementById('investment-amount');
const amountGuidanceMessage = document.getElementById('amount-guidance');
const calculatorResultsDiv = document.getElementById('calculator-results');

// Download modal elements
const openDownloadModalBtn = document.getElementById('openDownloadModal');
const downloadModal = document.getElementById('download-modal');
const closeModalBtn = document.querySelector('#download-modal .close-button');
const modalDownloadPrompt = document.getElementById('modal-download-prompt');
const modalDownloadMessage = document.getElementById('modal-download-message');


// Download buttons for the modal
const downloadCompanyPdfBtn = document.getElementById('downloadCompanyPdfBtn');
const downloadCompanyExcelBtn = document.getElementById('downloadCompanyExcelBtn');
const downloadProductPdfBtn = document.getElementById('downloadProductPdfBtn');
const downloadProductImageBtn = document.getElementById('downloadProductImageBtn');
const downloadProductExcelBtn = document.getElementById('downloadProductExcelBtn');

// Calculator-specific download buttons container
const calcDownloadButtonsContainer = document.getElementById('calc-download-buttons');


let currentSelectedProductOptions = []; // Stores ALL options for the selected product type
let currentSelectedProductType = '';    // Stores the product name (e.g., "SD 5.5 Year")
let currentSelectedDetailForCalc = null; // Stores the specific detail object chosen by radio button


// Function to enable/disable download buttons based on selection state
function setDownloadButtonState(companySelected, productSelected, amountEntered) {
    // Buttons in the modal
    downloadCompanyPdfBtn.disabled = true;
    downloadCompanyExcelBtn.disabled = true;
    downloadProductPdfBtn.disabled = true;
    downloadProductImageBtn.disabled = true;
    downloadProductExcelBtn.disabled = true;

    // Clear and hide calculator-specific download buttons
    calcDownloadButtonsContainer.innerHTML = '';


    if (companySelected) {
        downloadCompanyPdfBtn.disabled = false;
        downloadCompanyExcelBtn.disabled = false;
        modalDownloadPrompt.textContent = `Download all product details for ${companySelected}.`;

        if (productSelected && currentSelectedDetailForCalc) {
            // Check for Vanchinad NCD unavailability
            if (companySelected === "Vanchinad Finance (P) Ltd" && productSelected === "Non-Convertible Debentures (NCD)") {
                modalDownloadPrompt.textContent = "Vanchinad NCD is currently unavailable for detailed reports. Please select SML NCD.";
                return; // Disable product-specific downloads for unavailable NCD
            }

            modalDownloadPrompt.textContent = `Download report for "${productSelected}" (selected option).`;

            // Enable basic product details download (PDF/Image) even without amount for product-wise report
            downloadProductPdfBtn.disabled = false;
            downloadProductImageBtn.disabled = false;
            
            const isValidAmount = !isNaN(amountEntered) && amountEntered > 0;
            
            // Re-validate amount against remarks to ensure download buttons are only active for valid calculations
            const remarks = currentSelectedDetailForCalc.remarks || '';
            const regexMatch = remarks.match(
                /(\d+)\s+Lakhs?\s+to\s+less\s+than\s+(\d+)\s+LAKHS?|/ + // Group 1, 2
                /(\d+)\s+LAKHS?\s+and\s+Above|/ + // Group 3
                /(\d+)\s+and\s+Above|/ + // Group 4
                /(\d+)\/month\s+&\s+Above/i // Group 5
            );
            
            let amountWithinRange = true;
            if (regexMatch) {
                let minAmount = 0;
                let maxAmount = Infinity;
                if (regexMatch[1] && regexMatch[2]) { minAmount = parseInt(regexMatch[1]) * 100000; maxAmount = parseInt(regexMatch[2]) * 100000 - 1; }
                else if (regexMatch[3]) { minAmount = parseInt(regexMatch[3]) * 100000; }
                else if (regexMatch[4]) { minAmount = parseInt(regexMatch[4]); }
                else if (regexMatch[5]) { minAmount = parseInt(regexMatch[5]); }

                if (isValidAmount && (amountEntered < minAmount || (maxAmount !== Infinity && amountEntered > maxAmount))) {
                    amountWithinRange = false;
                }
            }


            if (isValidAmount && amountWithinRange) { // Product-specific report including calculation
                downloadProductExcelBtn.disabled = false; // Excel needs amount for calculation
                
                // Add calculator-specific download buttons next to results
                calcDownloadButtonsContainer.innerHTML = `
                    <button id="downloadCalcPdfBtn" class="action-button">Calc PDF</button>
                    <button id="downloadCalcImageBtn" class="action-button">Calc Image</button>
                    <button id="downloadCalcExcelBtn" class="action-button">Calc Excel</button>
                `;
                // Add event listeners for these dynamically created buttons
                document.getElementById('downloadCalcPdfBtn').addEventListener('click', () => downloadMainReport('product', 'pdf'));
                document.getElementById('downloadCalcImageBtn').addEventListener('click', () => downloadMainReport('product', 'png'));
                document.getElementById('downloadCalcExcelBtn').addEventListener('click', () => downloadExcelReport('product', companySelected, productSelected, currentSelectedDetailForCalc, amountEntered, calcDownloadButtonsContainer.querySelector('.download-message') || calculatorResultsDiv)); // Pass appropriate target div for message

            } else { // Product-specific report without calculation (if amount is missing/invalid)
                 downloadProductExcelBtn.disabled = true; 
                 modalDownloadPrompt.textContent = `Product "${productSelected}" selected. Enter a valid amount to enable calculator downloads.`;
            }

        } else {
            modalDownloadPrompt.textContent = "Select a specific product option to enable product-specific downloads.";
        }
    } else {
        modalDownloadPrompt.textContent = "Select a company and a product to enable download options.";
    }
}


function populateProductSelect(companyName) {
    productSelect.innerHTML = '<option value="">-- Select a product --</option>';
    productSelect.disabled = true;
    selectedProductNameDiv.textContent = '';
    selectedCompanyNameDiv.textContent = companyName; // Update company name display

    productDetailsDiv.innerHTML = '<p class="placeholder-text">Select a company and a product to view details.</p>';
    
    // Clear calculator results and reset state when company selection changes
    calculatorResultsDiv.innerHTML = '<p class="placeholder-text">Enter an amount and select a product option above to calculate returns.</p>';
    investmentAmountInput.value = '';
    investmentAmountInput.disabled = true; // Disable amount input initially
    amountGuidanceMessage.textContent = 'Please select a product option.'; // Default guidance
    
    currentSelectedProductOptions = [];
    currentSelectedProductType = '';
    currentSelectedDetailForCalc = null;

    if (companyName && investmentData[companyName]) {
        const products = Object.keys(investmentData[companyName]);
        products.forEach(product => {
            const option = document.createElement('option');
            option.value = product;
            option.textContent = product;
            productSelect.appendChild(option);
        });
        productSelect.disabled = false;
    }
    // Update download buttons based on company selection
    setDownloadButtonState(companyName, null, null);
}

function displayProductDetails(companyName, productName) {
    productDetailsDiv.innerHTML = ''; // Clear previous details
    selectedCompanyNameDiv.textContent = companyName ? companyName : '';
    selectedProductNameDiv.textContent = productName ? productName : '';

    currentSelectedProductOptions = []; // Clear previous options
    currentSelectedProductType = productName; // Store for calculation logic
    currentSelectedDetailForCalc = null; // Reset selected detail for calc

    investmentAmountInput.value = ''; // Clear amount
    investmentAmountInput.disabled = true; // Disable by default
    amountGuidanceMessage.textContent = 'Select a product option for amount guidance.'; // Default guidance


    if (companyName && productName && investmentData[companyName] && investmentData[companyName][productName]) {
        // --- Specific check for Vanchinad NCD availability ---
        if (companyName === "Vanchinad Finance (P) Ltd" && productName === "Non-Convertible Debentures (NCD)") {
            productDetailsDiv.innerHTML = `
                <div class="no-ncd-message">
                    <p><strong>Currently no NCD Issue Available. Kindly Opt SML NCD.</strong></p>
                </div>
            `;
            // Clear calculator results and reset state when this message is displayed
            calculatorResultsDiv.innerHTML = '<p class="placeholder-text">Enter an amount and select a product option above to calculate returns.</p>';
            currentSelectedProductOptions = []; // Ensure no options are loaded for calc
            currentSelectedProductType = '';
            setDownloadButtonState(companyName, productName, null); // Update download buttons state
            return; // Exit the function early as no details to display
        }
        // --- End of specific check ---

        const detailsArray = investmentData[companyName][productName];
        currentSelectedProductOptions = detailsArray; // Store all options for calculator

        const isDoublingProduct = productName.toLowerCase().includes('doubling');
        const isNCDProduct = productName.toLowerCase().includes('ncd');

        detailsArray.forEach((detail, index) => {
            const card = document.createElement('div');
            card.classList.add('product-card');

            // Add radio button for selection - Ensuring unique and safe group names
            const sanitizedCompanyName = companyName.replace(/[^a-zA-Z0-9]/g, '');
            const sanitizedProductName = productName.replace(/[^a-zA-Z0-9]/g, '');
            const radioGroupName = `${sanitizedCompanyName}-${sanitizedProductName}-option`;
            const radioId = `option-${sanitizedCompanyName}-${sanitizedProductName}-${index}`;
            
            let cardContent = `
                <input type="radio" class="product-option-select" name="${radioGroupName}" id="${radioId}" value="${index}">
                <label for="${radioId}"><h4>Option ${index + 1}</h4></label>
            `;

            // "For Amount" based on remark content
            if (detail.remarks) {
                cardContent += `<p><strong>For Amount:</strong> ${detail.remarks}</p>`;
            }

            // Display Period for all products
            if (detail.period) {
                cardContent += `<p><strong>Period:</strong> ${detail.period}</p>`;
            }

            // Specific display for Doubling products
            if (isDoublingProduct) {
                cardContent += `
                    <p><strong>Remarks:</strong> ${detail.doublingRemark}</p>
                `;
            }
            // Specific display for NCD products
            else if (isNCDProduct) {
                 cardContent += `
                    <p><strong>Monthly Interest:</strong> ${detail.monthly}</p>
                    <p><strong>Yearly Interest:</strong> ${detail.yearly}</p>
                    <p><strong>Closure Remark:</strong> ${detail.closureRemark}</p>
                    <p><strong>Premature Closure Terms:</strong></p>
                    <table class="closure-table product-details-table"> <thead>
                            <tr>
                                <th>Closure Period</th>
                                <th>Interest Cut</th>
                            </tr>
                        </thead>
                        <tbody>`;
                // Dynamically build rows for NCD closure terms
                if (detail.closureTerms && detail.closureTerms.length > 0) {
                    detail.closureTerms.forEach(term => {
                        cardContent += `
                            <tr>
                                <td>${term.period}</td>
                                <td>${term.cut}</td>
                            </tr>
                        `;
                    });
                } else {
                    cardContent += `<tr><td colspan="2">No specific closure terms provided.</td></tr>`;
                }
                cardContent += `
                        </tbody>
                    </table>
                `;
            }
            // Default display for other products (like SD and Sangeeth Nidhi Deposits)
            else { // SD and Sangeeth Nidhi
                if (detail.monthly) {
                    cardContent += `<p><strong>Monthly Interest:</strong> ${detail.monthly}</p>`;
                }
                if (detail.yearly) {
                    cardContent += `<p><strong>Yearly Interest:</strong> ${detail.yearly}</p>`;
                }
            }

            // Add "No Premature Closing Allowed" for SD and Doubling products
            if ((isDoublingProduct || productName.toLowerCase().includes('sd')) && detail.generalRemark) {
                cardContent += `<p class="general-remark"><strong>Important:</strong> ${detail.generalRemark}</p>`;
            }

            card.innerHTML = cardContent;
            productDetailsDiv.appendChild(card);

            // Add event listener for each radio button
            const radioElement = card.querySelector(`#${radioId}`);
            if (radioElement) {
                radioElement.addEventListener('change', (event) => {
                    if (event.target.checked) {
                        currentSelectedDetailForCalc = currentSelectedProductOptions[parseInt(event.target.value)];
                        // Set amount input state based on selection
                        updateAmountInputState(currentSelectedDetailForCalc.remarks);
                        calculateInvestmentReturns(); // Trigger calculation on radio button change
                    }
                });

                // Auto-select the first option if there's only one, or if no other is selected yet
                if (detailsArray.length === 1 || (index === 0 && !currentSelectedDetailForCalc)) {
                     if(radioElement) { // Make sure the radio element exists before trying to check it
                        radioElement.checked = true;
                        currentSelectedDetailForCalc = detail;
                        updateAmountInputState(currentSelectedDetailForCalc.remarks); // Set state for auto-selected
                     }
                }
            }
        });
    } else {
        productDetailsDiv.innerHTML = '<p class="placeholder-text">Select a company and a product to view details.</p>';
    }

    // Always trigger calculation here to clear/update based on new product selection or if amount already exists
    calculateInvestmentReturns();
    // Update download buttons state based on current selection
    setDownloadButtonState(companyName, productName, parseFloat(investmentAmountInput.value));
}

// Update Amount Input State based on product remarks
function updateAmountInputState(remarks) {
    investmentAmountInput.disabled = false; // Enable by default for now
    amountGuidanceMessage.textContent = ''; // Clear previous message
    investmentAmountInput.value = ''; // Clear previous value to force re-entry if range changed

    // Refined regex to handle different "remarks" patterns
    const regexMatch = remarks.match(
        /(\d+)\s+LAKHS?\s+to\s+less\s+than\s+(\d+)\s+LAKHS?|/ + // Group 1, 2: X Lakhs to less than Y Lakhs
        /(\d+)\s+LAKHS?\s+and\s+Above|/ + // Group 3: X Lakhs and Above
        /(\d+)\s+and\s+Above|/ + // Group 4: X and Above (for thousands/hundreds)
        /(\d+)\/month\s+&\s+Above|/ + // Group 5: X/month & Above
        /^(\d+)$/ // Group 6: Exact amount like "5000"
    );
    
    let minAmount = 0;
    let maxAmount = Infinity;
    let guidanceText = 'Enter your investment amount.';
    let placeholderText = 'e.g., 10000';

    if (regexMatch) {
        if (regexMatch[1] && regexMatch[2]) { // "X Lakhs to less than Y Lakhs"
            minAmount = parseInt(regexMatch[1]) * 100000;
            maxAmount = parseInt(regexMatch[2]) * 100000 - 1; // "less than" means up to Y-1
            guidanceText = `Enter an amount between ₹${minAmount.toLocaleString('en-IN')} and ₹${maxAmount.toLocaleString('en-IN')}.`;
            placeholderText = `e.g., ${minAmount.toLocaleString('en-IN')}`;
        } else if (regexMatch[3]) { // "X Lakhs and Above"
            minAmount = parseInt(regexMatch[3]) * 100000;
            guidanceText = `Enter an amount of ₹${minAmount.toLocaleString('en-IN')} or above.`;
            placeholderText = `e.g., ${minAmount.toLocaleString('en-IN')}`;
        } else if (regexMatch[4]) { // "X and Above" (for thousands/hundreds like 5000 and Above)
            minAmount = parseInt(regexMatch[4]);
            guidanceText = `Enter an amount of ₹${minAmount.toLocaleString('en-IN')} or above.`;
            placeholderText = `e.g., ${minAmount.toLocaleString('en-IN')}`;
        } else if (regexMatch[5]) { // "X/month & Above"
            minAmount = parseInt(regexMatch[5]);
            guidanceText = `Enter monthly investment of ₹${minAmount.toLocaleString('en-IN')} or above.`;
            placeholderText = `e.g., ${minAmount.toLocaleString('en-IN')}`;
        } else if (regexMatch[6]) { // Exact amount
            minAmount = parseInt(regexMatch[6]);
            maxAmount = parseInt(regexMatch[6]);
            guidanceText = `Enter exactly ₹${minAmount.toLocaleString('en-IN')}.`;
            placeholderText = `${minAmount.toLocaleString('en-IN')}`;
            investmentAmountInput.value = minAmount; // Auto-fill exact amount
            investmentAmountInput.disabled = true; // Disable if exact amount needed
        }
    }
    
    investmentAmountInput.min = minAmount;
    if (maxAmount !== Infinity) {
        investmentAmountInput.max = maxAmount;
    } else {
        investmentAmountInput.removeAttribute('max');
    }
    amountGuidanceMessage.textContent = guidanceText;
    investmentAmountInput.placeholder = placeholderText;
}


// Function to safely parse percentage strings
function parsePercentage(value) {
    if (typeof value === 'string') {
        const num = parseFloat(value.replace('%', ''));
        return isNaN(num) ? null : num / 100;
    }
    return null;
}

// Calculate Investment Returns
function calculateInvestmentReturns() {
    const amount = parseFloat(investmentAmountInput.value);
    calculatorResultsDiv.innerHTML = ''; // Clear previous results

    const companyName = companySelect.value;
    const productName = productSelect.value;
    
    // Update download buttons based on current values immediately
    setDownloadButtonState(companyName, productName, amount);

    if (isNaN(amount) || amount <= 0) {
        calculatorResultsDiv.innerHTML = '<p class="placeholder-text">Enter a valid positive amount.</p>';
        return;
    }

    // Ensure a specific product option is selected for calculation
    if (!currentSelectedDetailForCalc || !currentSelectedProductType) {
        calculatorResultsDiv.innerHTML = '<p class="placeholder-text">Please select a product option above to calculate returns.</p>';
        return;
    }

    const detail = currentSelectedDetailForCalc;
    const currentProductName = currentSelectedProductType;
    
    // If Vanchinad NCD is selected, show message and prevent calculation
    if (companyName === "Vanchinad Finance (P) Ltd" && currentProductName === "Non-Convertible Debentures (NCD)") {
        calculatorResultsDiv.innerHTML = `
            <div class="no-ncd-message">
                <p><strong>Currently no NCD Issue Available for calculation. Kindly Opt SML NCD.</strong></p>
            </div>
        `;
        return;
    }

    // Amount validation based on selected option's remarks (smart calculator logic)
    const remarks = detail.remarks || '';
    const regexMatch = remarks.match(
        /(\d+)\s+LAKHS?\s+to\s+less\s+than\s+(\d+)\s+LAKHS?|/ + // Group 1, 2
        /(\d+)\s+LAKHS?\s+and\s+Above|/ + // Group 3
        /(\d+)\s+and\s+Above|/ + // Group 4
        /(\d+)\/month\s+&\s+Above|/ + // Group 5
        /^(\d+)$/ // Group 6
    );

    let isValidAmountForCalculation = true;
    let minAmount = 0;
    let maxAmount = Infinity;

    if (regexMatch) {
        if (regexMatch[1] && regexMatch[2]) { // "X Lakhs to less than Y Lakhs"
            minAmount = parseInt(regexMatch[1]) * 100000;
            maxAmount = parseInt(regexMatch[2]) * 100000 - 1;
            if (amount < minAmount || amount > maxAmount) {
                isValidAmountForCalculation = false;
                calculatorResultsDiv.innerHTML = `<p class="no-ncd-message">Amount must be between ₹${minAmount.toLocaleString('en-IN')} and ₹${maxAmount.toLocaleString('en-IN')} for this option.</p>`;
            }
        } else if (regexMatch[3]) { // "X Lakhs and Above"
            minAmount = parseInt(regexMatch[3]) * 100000;
            if (amount < minAmount) {
                isValidAmountForCalculation = false;
                calculatorResultsDiv.innerHTML = `<p class="no-ncd-message">Amount must be ₹${minAmount.toLocaleString('en-IN')} or above for this option.</p>`;
            }
        } else if (regexMatch[4]) { // "X and Above" (for thousands)
            minAmount = parseInt(regexMatch[4]);
            if (amount < minAmount) {
                isValidAmountForCalculation = false;
                calculatorResultsDiv.innerHTML = `<p class="no-ncd-message">Amount must be ₹${minAmount.toLocaleString('en-IN')} or above for this option.</p>`;
            }
        } else if (regexMatch[5]) { // "X/month & Above"
            minAmount = parseInt(regexMatch[5]);
            if (amount < minAmount) {
                isValidAmountForCalculation = false;
                calculatorResultsDiv.innerHTML = `<p class="no-ncd-message">Monthly investment must be ₹${minAmount.toLocaleString('en-IN')} or above for this option.</p>`;
            }
        } else if (regexMatch[6]) { // Exact amount
            minAmount = parseInt(regexMatch[6]);
            maxAmount = parseInt(regexMatch[6]);
            if (amount !== minAmount) { // Must be exactly this amount
                isValidAmountForCalculation = false;
                calculatorResultsDiv.innerHTML = `<p class="no-ncd-message">Amount must be exactly ₹${minAmount.toLocaleString('en-IN')} for this option.</p>`;
            }
        }
    }

    if (!isValidAmountForCalculation) {
        return; // Stop calculation if amount is invalid
    }


    const isDoublingProduct = currentProductName.toLowerCase().includes('doubling');
    const isNCDProduct = currentProductName.toLowerCase().includes('ncd');

    let resultsHTML = '';

    if (isDoublingProduct) {
        const maturityAmount = amount * 2;
        resultsHTML += `
            <div class="calculator-result-card">
                <h4>Doubling Scheme Result</h4>
                <p>Investment Amount: <strong>₹ ${amount.toLocaleString('en-IN')}</strong></p>
                <p>Maturity Amount (Approx): <strong>₹ ${maturityAmount.toLocaleString('en-IN')}</strong></p>
                <p>Period: ${detail.period}</p>
                <p>Remarks: ${detail.doublingRemark}</p>
            </div>
        `;
    } else if (isNCDProduct) {
        const monthlyRate = parsePercentage(detail.monthly);
        const yearlyRate = parsePercentage(detail.yearly);

        let monthlyInterestDisplay = '';
        if (monthlyRate !== null) {
            const calculatedMonthlyInterest = amount * monthlyRate / 12;
            monthlyInterestDisplay = `₹ ${calculatedMonthlyInterest.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        } else if (detail.monthly && (detail.monthly.toLowerCase().includes('not available') || detail.monthly.toLowerCase().includes('monthly'))) {
            monthlyInterestDisplay = "Not Available";
        } else {
             monthlyInterestDisplay = "N/A";
        }

        let annualInterestDisplay = '';
        if (yearlyRate !== null) {
            const calculatedAnnualInterest = amount * yearlyRate;
            annualInterestDisplay = `₹ ${calculatedAnnualInterest.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        } else if (detail.yearly && detail.yearly.toLowerCase().includes('not available')) {
             annualInterestDisplay = "Not Available";
        } else {
             annualInterestDisplay = "N/A";
        }

        resultsHTML += `
            <div class="calculator-result-card">
                <h4>NCD Return Calculation</h4>
                <p>Investment Amount: <strong>₹ ${amount.toLocaleString('en-IN')}</strong></p>
                <p>Estimated Monthly Interest: <strong>${monthlyInterestDisplay}</strong></p>
                <p>Estimated Annual Interest: <strong>${annualInterestDisplay}</strong></p>
                <p>Period: ${detail.period}</p>
                <p>Closure Remark: ${detail.closureRemark}</p>
            </div>
        `;
        // Premature Closure Interest Cut table is intentionally NOT added here, as per requirement
    } else {
        // Standard Fixed Deposit (SD, Sangeeth Nidhi)
        const monthlyRate = parsePercentage(detail.monthly);
        const yearlyRate = parsePercentage(detail.yearly);

        let monthlyInterestDisplay = '';
        if (monthlyRate !== null) {
            const calculatedMonthlyInterest = amount * monthlyRate / 12;
            monthlyInterestDisplay = `₹ ${calculatedMonthlyInterest.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        } else if (detail.monthly && detail.monthly.toLowerCase().includes('not available')) {
            monthlyInterestDisplay = "Not Available";
        } else {
             monthlyInterestDisplay = "N/A";
        }

        let annualInterestDisplay = '';
        if (yearlyRate !== null) {
            const calculatedAnnualInterest = amount * yearlyRate;
            annualInterestDisplay = `₹ ${calculatedAnnualInterest.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        } else if (detail.yearly && detail.yearly.toLowerCase().includes('not available')) {
             annualInterestDisplay = "Not Available";
        } else {
             annualInterestDisplay = "N/A";
        }

        resultsHTML += `
            <div class="calculator-result-card">
                <h4>Estimated Interest Earnings</h4>
                <p>Investment Amount: <strong>₹ ${amount.toLocaleString('en-IN')}</strong></p>
                <p>Estimated Monthly Interest: <strong>${monthlyInterestDisplay}</strong></p>
                <p>Estimated Annual Interest: <strong>${annualInterestDisplay}</strong></p>
                <p>Period: ${detail.period}</p>
                ${detail.generalRemark ? `<p class="general-remark"><strong>Important:</strong> ${detail.generalRemark}</p>` : ''}
            </div>
        `;
    }

    calculatorResultsDiv.innerHTML = resultsHTML;
    // Update download button state again as calculation is complete
    setDownloadButtonState(companyName, productName, amount);
}

// --- Download Functions ---

function showDownloadMessage(message, isError = false, targetDiv = modalDownloadMessage) {
    targetDiv.textContent = message;
    targetDiv.style.color = isError ? '#d9534f' : getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim() || '#0056b3';
    setTimeout(() => {
        targetDiv.textContent = '';
    }, 5000); // Clear message after 5 seconds
}

// Helper to get sanitized file name
function getFileName(reportContext, format) { // reportContext: 'company' or 'product'
    const company = companySelect.value || 'Report';
    const product = productSelect.value || 'All_Products'; // For company-wise
    let amountPart = '';

    // Only include amount in filename if it's a product-specific report AND amount is valid
    if (reportContext === 'product' && investmentAmountInput.value && !isNaN(parseFloat(investmentAmountInput.value))) {
        amountPart = `_Amt_${parseFloat(investmentAmountInput.value).toLocaleString('en-IN').replace(/,/g, '')}`;
    }
    
    const baseName = reportContext === 'company' ? `${company.replace(/[^a-zA-Z0-9]/g, '_')}_AllProducts` : 
                     `${company.replace(/[^a-zA-Z0-9]/g, '_')}_${product.replace(/[^a-zA-Z0-9]/g, '_')}${amountPart}_Report`;
    
    const date = new Date().toISOString().slice(0, 10); //YYYY-MM-DD
    return `${baseName}_${date}.${format}`;
}

// Helper to generate the content for PDF/Image reports
function generateReportContentHTML(reportType, company, product, selectedDetail, amount) {
    let reportHTML = `
        <div class="report-container">
            <h1 style="color: #0056b3; text-align: center;">Investment Product Report</h1>
            <p style="text-align: center; font-style: italic; font-size: 14px; margin-bottom: 20px;">Generated on: ${new Date().toLocaleDateString()}</p>
            <hr>
    `;

    // --- Company-level report (all products for a company) ---
    if (reportType === 'company') {
        reportHTML += `<h2 style="color: #0056b3;">Company: ${company}</h2>`;
        const companyProducts = investmentData[company];

        for (const prodName in companyProducts) {
            if (companyProducts.hasOwnProperty(prodName)) {
                // Skip Vanchinad NCD for company report if it's supposed to be unavailable
                if (company === "Vanchinad Finance (P) Ltd" && prodName === "Non-Convertible Debentures (NCD)") {
                    reportHTML += `<h3 style="color: #007bff; margin-top: 25px; margin-bottom: 10px;">Product: ${prodName} (Currently Unavailable)</h3>`;
                    reportHTML += `<div style="background-color: #ffe0b2; color: #e65100; padding: 10px; border-radius: 5px; margin-bottom: 15px; font-size: 12px;">Currently no NCD Issue Available. Kindly Opt SML NCD.</div>`;
                    continue; // Skip rendering details for this product
                }

                reportHTML += `<h3 style="color: #007bff;">Product: ${prodName}</h3>`;
                const detailsArray = companyProducts[prodName];
                const isDoublingProduct = prodName.toLowerCase().includes('doubling');
                const isNCDProduct = prodName.toLowerCase().includes('ncd');

                detailsArray.forEach((detail, index) => {
                    reportHTML += `
                        <div class="report-card">
                            <h4>Option ${index + 1}</h4>
                            <p><strong>For Amount:</strong> ${detail.remarks}</p>
                            <p><strong>Period:</strong> ${detail.period}</p>
                    `;

                    if (isDoublingProduct) {
                        reportHTML += `<p><strong>Remarks:</strong> ${detail.doublingRemark}</p>`;
                    } else if (isNCDProduct) {
                        reportHTML += `
                            <p><strong>Monthly Interest:</strong> ${detail.monthly}</p>
                            <p><strong>Yearly Interest:</strong> ${detail.yearly}</p>
                            <p><strong>Closure Remark:</strong> ${detail.closureRemark}</p>
                            <p><strong>Premature Closure Terms:</strong></p>
                            <table class="report-table">
                                <thead>
                                    <tr>
                                        <th>Closure Period</th>
                                        <th>Interest Cut</th>
                                    </tr>
                                </thead>
                                <tbody>
                        `;
                        if (detail.closureTerms && detail.closureTerms.length > 0) {
                            detail.closureTerms.forEach(term => {
                                reportHTML += `
                                    <tr>
                                        <td>${term.period}</td>
                                        <td>${term.cut}</td>
                                    </tr>
                                `;
                            });
                        } else {
                            reportHTML += `<tr><td colspan="2">No specific closure terms provided.</td></tr>`;
                        }
                        reportHTML += `
                                </tbody>
                            </table>
                        `;
                    } else { // SD and Sangeeth Nidhi
                        if (detail.monthly) reportHTML += `<p><strong>Monthly Interest:</strong> ${detail.monthly}</p>`;
                        if (detail.yearly) reportHTML += `<p><strong>Yearly Interest:</strong> ${detail.yearly}</p>`;
                    }
                    if (detail.generalRemark) reportHTML += `<p class="general-remark">Important: ${detail.generalRemark}</p>`;
                    reportHTML += `</div>`; // Close report-card
                });
                reportHTML += `<hr>`; // Separator between products
            }
        }
    } 
    // --- Product/Calculator-level report ---
    else if (reportType === 'product' && selectedDetail) {
        reportHTML += `<h2 style="color: #0056b3;">Company: ${company}</h2>`;
        reportHTML += `<h3 style="color: #007bff;">Product: ${product} (Selected Option)</h3>`;
        
        // Product Details Section
        reportHTML += `
            <div class="report-card">
                <h4>Product Details</h4>
                <p><strong>For Amount:</strong> ${selectedDetail.remarks}</p>
                <p><strong>Period:</strong> ${selectedDetail.period}</p>
        `;
        const isDoublingProduct = product.toLowerCase().includes('doubling');
        const isNCDProduct = product.toLowerCase().includes('ncd');

        if (isDoublingProduct) {
            reportHTML += `<p><strong>Remarks:</strong> ${selectedDetail.doublingRemark}</p>`;
        } else if (isNCDProduct) {
            reportHTML += `
                <p><strong>Monthly Interest:</strong> ${selectedDetail.monthly}</p>
                <p><strong>Yearly Interest:</strong> ${selectedDetail.yearly}</p>
                <p><strong>Closure Remark:</strong> ${selectedDetail.closureRemark}</p>
                <p><strong>Premature Closure Terms:</strong></p>
                <table class="report-table">
                    <thead>
                        <tr>
                            <th>Closure Period</th>
                            <th>Interest Cut</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
            if (selectedDetail.closureTerms && selectedDetail.closureTerms.length > 0) {
                selectedDetail.closureTerms.forEach(term => {
                    reportHTML += `
                        <tr>
                            <td>${term.period}</td>
                            <td>${term.cut}</td>
                        </tr>
                    `;
                });
            } else {
                reportHTML += `<tr><td colspan="2">No specific closure terms provided.</td></tr>`;
            }
            reportHTML += `
                    </tbody>
                </table>
            `;
        } else { // SD and Sangeeth Nidhi
            if (selectedDetail.monthly) reportHTML += `<p><strong>Monthly Interest:</strong> ${selectedDetail.monthly}</p>`;
            if (selectedDetail.yearly) reportHTML += `<p><strong>Yearly Interest:</strong> ${selectedDetail.yearly}</p>`;
        }
        if (selectedDetail.generalRemark) reportHTML += `<p class="general-remark">Important: ${selectedDetail.generalRemark}</p>`;
        reportHTML += `</div>`; // Close product details section

        // Calculator Results Section (only if amount is valid and calculation was performed)
        if (!isNaN(amount) && amount > 0) {
            // Re-validate amount for display in report, in case it was called without full validation
            const remarks = selectedDetail.remarks || '';
            const regexMatch = remarks.match(/(\d+)\s+Lakhs?\s+to\s+less\s+than\s+(\d+)\s+Lakhs?|(\d+)\s+Lakhs?\s+and\s+Above|(\d+)\s+and\s+Above|(\d+)\/month\s+&\s+Above|^(\d+)$/i);
            let isValidForReportCalc = true;

            if (regexMatch) {
                let minAmount = 0;
                let maxAmount = Infinity;
                if (regexMatch[1] && regexMatch[2]) { minAmount = parseInt(regexMatch[1]) * 100000; maxAmount = parseInt(regexMatch[2]) * 100000 - 1; }
                else if (regexMatch[3]) { minAmount = parseInt(regexMatch[3]) * 100000; }
                else if (regexMatch[4]) { minAmount = parseInt(regexMatch[4]); }
                else if (regexMatch[5]) { minAmount = parseInt(regexMatch[5]); }
                else if (regexMatch[6]) { minAmount = parseInt(regexMatch[6]); maxAmount = parseInt(regexMatch[6]); }
                
                if (amount < minAmount || (maxAmount !== Infinity && amount > maxAmount)) {
                    isValidForReportCalc = false;
                }
            }
            if (isValidForReportCalc) {
                reportHTML += `<hr><h3 style="color: #007bff;">Calculator Results for Investment Amount: ₹${amount.toLocaleString('en-IN')}</h3>`;
                reportHTML += `<div class="report-card">`;
                if (isDoublingProduct) {
                    const maturityAmount = amount * 2;
                    reportHTML += `
                        <p>Maturity Amount (Approx): <strong>₹ ${maturityAmount.toLocaleString('en-IN')}</strong></p>
                        <p>Period: ${selectedDetail.period}</p>
                        <p>Remarks: ${selectedDetail.doublingRemark}</p>
                    `;
                } else {
                    const monthlyRate = parsePercentage(selectedDetail.monthly);
                    const yearlyRate = parsePercentage(selectedDetail.yearly);

                    let monthlyInterestDisplay = 'N/A';
                    if (monthlyRate !== null) {
                        const calculatedMonthlyInterest = amount * monthlyRate / 12;
                        monthlyInterestDisplay = `₹ ${calculatedMonthlyInterest.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
                    } else if (selectedDetail.monthly && selectedDetail.monthly.toLowerCase().includes('not available')) {
                        monthlyInterestDisplay = "Not Available";
                    }

                    let annualInterestDisplay = 'N/A';
                    if (yearlyRate !== null) {
                        const calculatedAnnualInterest = amount * yearlyRate;
                        annualInterestDisplay = `₹ ${calculatedAnnualInterest.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
                    } else if (selectedDetail.yearly && selectedDetail.yearly.toLowerCase().includes('not available')) {
                        annualInterestDisplay = "Not Available";
                    }

                    reportHTML += `
                        <p>Estimated Monthly Interest: <strong>${monthlyInterestDisplay}</strong></p>
                        <p>Estimated Annual Interest: <strong>${annualInterestDisplay}</strong></p>
                        <p>Period: ${selectedDetail.period}</p>
                    `;
                }
                reportHTML += `</div>`; // Close calculator results section
            } else {
                reportHTML += `<hr><p style="color: #d9534f; font-weight: bold; text-align: center;">Note: Calculator results not included. The entered amount (₹${amount.toLocaleString('en-IN')}) is outside the valid range for this option.</p>`;
            }
        }
    }

    reportHTML += `</div>`; // Close main report-container div
    return reportHTML;
}


async function downloadMainReport(reportType, format) {
    showDownloadMessage(`Generating ${format.toUpperCase()}...`, false, modalDownloadMessage);
    
    const company = companySelect.value;
    const product = productSelect.value;
    const amount = parseFloat(investmentAmountInput.value);

    // Initial checks for valid content before generating
    if (!company) {
        showDownloadMessage('Please select a company first.', true, modalDownloadMessage);
        return;
    }
    if (reportType === 'product' && (!product || !currentSelectedDetailForCalc)) {
        showDownloadMessage('Please select a product option first.', true, modalDownloadMessage);
        return;
    }
    // Specific check for Vanchinad NCD when trying to generate reports for it
    if (company === "Vanchinad Finance (P) Ltd" && product === "Non-Convertible Debentures (NCD)" && reportType === 'product') {
        showDownloadMessage('Vanchinad NCD is currently unavailable for detailed product reports.', true, modalDownloadMessage);
        return;
    }
    // For product report with calculator, ensure amount is valid
    if (reportType === 'product' && !isNaN(amount) && amount > 0) {
        // Re-run validation from calculator logic to ensure consistency
        const detail = currentSelectedDetailForCalc;
        const remarks = detail.remarks || '';
        const regexMatch = remarks.match(
            /(\d+)\s+Lakhs?\s+to\s+less\s+than\s+(\d+)\s+Lakhs?|/ +
            /(\d+)\s+LAKHS?\s+and\s+Above|/ +
            /(\d+)\s+and\s+Above|/ +
            /(\d+)\/month\s+&\s+Above|/ +
            /^(\d+)$/i
        );

        let minAmount = 0;
        let maxAmount = Infinity;
        let isValidAmountForDownloadReport = true;

        if (regexMatch) {
            if (regexMatch[1] && regexMatch[2]) { minAmount = parseInt(regexMatch[1]) * 100000; maxAmount = parseInt(regexMatch[2]) * 100000 - 1; }
            else if (regexMatch[3]) { minAmount = parseInt(regexMatch[3]) * 100000; }
            else if (regexMatch[4]) { minAmount = parseInt(regexMatch[4]); }
            else if (regexMatch[5]) { minAmount = parseInt(regexMatch[5]); }
            else if (regexMatch[6]) { minAmount = parseInt(regexMatch[6]); maxAmount = parseInt(regexMatch[6]); }
            
            if (amount < minAmount || (maxAmount !== Infinity && amount > maxAmount)) {
                isValidAmountForDownloadReport = false;
                showDownloadMessage(`The entered amount (₹${amount.toLocaleString('en-IN')}) is outside the valid range for this option. Calculator results might be excluded or incorrect.`, true, modalDownloadMessage);
                // We still allow download, but warn the user.
            }
        }
        if(!isValidAmountForDownloadReport){
            // If amount is invalid for calculation, then don't pass the amount to generateReportContentHTML
            // This ensures the calculator section is conditionally hidden in the report.
            amount = 0; 
        }
    }


    let htmlContentToConvert = generateReportContentHTML(reportType, company, product, currentSelectedDetailForCalc, amount);
    let fileNameType = reportType;
    
    if (!htmlContentToConvert) {
        showDownloadMessage('No content generated for the report. Please ensure valid selections.', true, modalDownloadMessage);
        return;
    }

    // Create a temporary div to render the HTML for conversion
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContentToConvert;
    tempDiv.style.position = 'absolute'; // Hide it visually
    tempDiv.style.left = '-9999px';
    tempDiv.style.top = '-9999px';
    tempDiv.style.width = '794px'; // Fixed width for A4 consistency in image/pdf rendering
    document.body.appendChild(tempDiv); // Append to DOM for html2canvas/html-to-image to work correctly


    try {
        if (format === 'pdf') {
            await html2pdf().set({
                margin: 10,
                filename: getFileName(fileNameType, 'pdf'),
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { 
                    scale: 2, 
                    logging: false, // Set to false for cleaner console output
                    dpi: 192, 
                    letterRendering: true, 
                    useCORS: true,
                },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            }).from(tempDiv).save();
            showDownloadMessage('PDF generated successfully!', false, modalDownloadMessage);
        } else if (format === 'png') {
            const dataUrl = await htmlToImage.toPng(tempDiv, {
                quality: 0.95,
                pixelRatio: 2 // Increase pixel ratio for higher resolution image
            });

            const link = document.createElement('a');
            link.download = getFileName(fileNameType, 'png');
            link.href = dataUrl;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            showDownloadMessage('Image generated successfully!', false, modalDownloadMessage);
        }
    } catch (error) {
        console.error(`Error generating ${format.toUpperCase()}:`, error);
        showDownloadMessage(`Failed to generate ${format.toUpperCase()}. Please try again. Check console for details.`, true, modalDownloadMessage);
    } finally {
        if (document.body.contains(tempDiv)) {
            document.body.removeChild(tempDiv); // Clean up the temporary div
        }
    }
}

// Separate function for Excel report, as it's data-driven, not HTML-to-file
function downloadExcelReport(reportType, company, product, selectedDetail, amount, targetMessageDiv = modalDownloadMessage) {
    showDownloadMessage('Generating Excel file...', false, targetMessageDiv);
    const data = [];

    // Initial checks for valid content before generating
    if (!company) {
        showDownloadMessage('Please select a company first.', true, targetMessageDiv);
        return;
    }
    // Specific check for Vanchinad NCD when trying to generate reports for it
    if (company === "Vanchinad Finance (P) Ltd" && product === "Non-Convertible Debentures (NCD)" && reportType === 'product') {
        showDownloadMessage('Vanchinad NCD is currently unavailable for Excel reports.', true, targetMessageDiv);
        return;
    }
    
    // --- Company-level Excel report ---
    if (reportType === 'company') {
        data.push([`${company} - All Product Details`]);
        data.push([]); // Empty row
        const companyProducts = investmentData[company];

        for (const prodName in companyProducts) {
            if (companyProducts.hasOwnProperty(prodName)) {
                // Skip Vanchinad NCD if it's supposed to be unavailable
                if (company === "Vanchinad Finance (P) Ltd" && prodName === "Non-Convertible Debentures (NCD)") {
                    data.push([`Product: ${prodName} (Currently Unavailable)`]);
                    data.push(['Note: Currently no NCD Issue Available. Kindly Opt SML NCD.']);
                    data.push([]); // Spacer
                    continue;
                }

                data.push([`Product: ${prodName}`]);
                const detailsArray = companyProducts[prodName];
                const isDoublingProduct = prodName.toLowerCase().includes('doubling');
                const isNCDProduct = prodName.toLowerCase().includes('ncd');

                if (isDoublingProduct) {
                    data.push(['Option', 'Period', 'Remarks', 'Doubling Remark', 'General Remark']);
                    detailsArray.forEach((detail, index) => {
                        data.push([
                            `Option ${index + 1}`,
                            detail.period || '',
                            detail.remarks || '',
                            detail.doublingRemark || '',
                            detail.generalRemark || ''
                        ]);
                    });
                } else if (isNCDProduct) {
                    data.push(['Option', 'Monthly Interest', 'Yearly Interest', 'Period', 'Remarks', 'Closure Remark']);
                    detailsArray.forEach((detail, index) => {
                        data.push([
                            `Option ${index + 1}`,
                            detail.monthly || 'N/A',
                            detail.yearly || 'N/A',
                            detail.period || '',
                            detail.remarks || '',
                            detail.closureRemark || ''
                        ]);
                        if (detail.closureTerms && detail.closureTerms.length > 0) {
                            data.push([]);
                            data.push(['Closure Period', 'Interest Cut / Effective Rate']);
                            detail.closureTerms.forEach(term => {
                                data.push([term.period, term.cut]);
                            });
                        }
                    });
                } else { // SD and Sangeeth Nidhi
                    data.push(['Option', 'Monthly Interest', 'Yearly Interest', 'Period', 'Remarks', 'General Remark']);
                    detailsArray.forEach((detail, index) => {
                        data.push([
                            `Option ${index + 1}`,
                            detail.monthly || 'N/A',
                            detail.yearly || 'N/A',
                            detail.period || '',
                            detail.remarks || '',
                            detail.generalRemark || ''
                        ]);
                    });
                }
                data.push([]); // Spacer row between products
            }
        }
    } 
    // --- Product/Calculator-level Excel report ---
    else if (reportType === 'product' && selectedDetail) {
        // Validation: Ensure amount is valid for product Excel report if calculation is expected
        const isValidAmountForCalc = !isNaN(amount) && amount > 0;

        data.push([`${company} - ${product} Details`]);
        data.push([]); // Empty row
        
        const isDoublingProduct = product.toLowerCase().includes('doubling');
        const isNCDProduct = product.toLowerCase().includes('ncd');

        // Product Details Section
        if (isDoublingProduct) {
            data.push(['Product Name', 'Option', 'Remarks', 'Period', 'Doubling Remark', 'General Remark']);
            data.push([
                product,
                'Selected Option',
                selectedDetail.remarks || '',
                selectedDetail.period || '',
                selectedDetail.doublingRemark || '',
                selectedDetail.generalRemark || ''
            ]);
        } else if (isNCDProduct) {
            data.push(['Product Name', 'Option', 'Monthly Interest', 'Yearly Interest', 'Period', 'Remarks', 'Closure Remark']);
            data.push([
                product,
                'Selected Option',
                selectedDetail.monthly || 'N/A',
                selectedDetail.yearly || 'N/A',
                selectedDetail.period || '',
                selectedDetail.remarks || '',
                selectedDetail.closureRemark || ''
            ]);
            if (selectedDetail.closureTerms && selectedDetail.closureTerms.length > 0) {
                data.push([]);
                data.push(['Closure Period', 'Interest Cut / Effective Rate']);
                selectedDetail.closureTerms.forEach(term => {
                    data.push([term.period, term.cut]);
                });
            }
        } else { // SD and Sangeeth Nidhi
            data.push(['Product Name', 'Option', 'Monthly Interest', 'Yearly Interest', 'Period', 'Remarks', 'General Remark']);
            data.push([
                product,
                'Selected Option',
                selectedDetail.monthly || 'N/A',
                selectedDetail.yearly || 'N/A',
                selectedDetail.period || '',
                selectedDetail.remarks || '',
                selectedDetail.generalRemark || ''
            ]);
        }
        data.push([]); // Spacer

        // Calculator Results Section (only if amount is valid for calculation)
        if (isValidAmountForCalc) {
            // Re-run validation from calculator logic to ensure consistency
            const remarks = selectedDetail.remarks || '';
            const regexMatch = remarks.match(
                /(\d+)\s+Lakhs?\s+to\s+less\s+than\s+(\d+)\s+Lakhs?|/ +
                /(\d+)\s+LAKHS?\s+and\s+Above|/ +
                /(\d+)\s+and\s+Above|/ +
                /(\d+)\/month\s+&\s+Above|^(\d+)$/i
            );

            let minAmount = 0;
            let maxAmount = Infinity;
            let isValidForReportCalc = true;

            if (regexMatch) {
                if (regexMatch[1] && regexMatch[2]) { minAmount = parseInt(regexMatch[1]) * 100000; maxAmount = parseInt(regexMatch[2]) * 100000 - 1; }
                else if (regexMatch[3]) { minAmount = parseInt(regexMatch[3]) * 100000; }
                else if (regexMatch[4]) { minAmount = parseInt(regexMatch[4]); }
                else if (regexMatch[5]) { minAmount = parseInt(regexMatch[5]); }
                else if (regexMatch[6]) { minAmount = parseInt(regexMatch[6]); maxAmount = parseInt(regexMatch[6]); }
                
                if (amount < minAmount || (maxAmount !== Infinity && amount > maxAmount)) {
                    isValidForReportCalc = false;
                    showDownloadMessage(`The entered amount (₹${amount.toLocaleString('en-IN')}) is outside the valid range for this option. Excel report might be incomplete.`, true, targetMessageDiv);
                    // Continue generating Excel, but with warning
                }
            }
            if(isValidForReportCalc){
                data.push(['Investment Calculator Results']);
                data.push([]); // Empty row
                data.push(['Investment Amount (₹)', 'Estimated Monthly Interest', 'Estimated Annual Interest', 'Period', 'Remarks']);

                if (isDoublingProduct) {
                    data.push([
                        amount.toLocaleString('en-IN'),
                        'N/A',
                        'N/A',
                        selectedDetail.period,
                        `Maturity Amount: ₹${(amount * 2).toLocaleString('en-IN')} - ${selectedDetail.doublingRemark}`
                    ]);
                } else {
                    let monthlyInterestCalcDisplay = 'N/A';
                    if (selectedDetail.monthly && selectedDetail.monthly.toLowerCase() !== 'not available' && selectedDetail.monthly.endsWith('%')) {
                        const monthlyRate = parseFloat(selectedDetail.monthly) / 100;
                        monthlyInterestCalcDisplay = `₹ ${(amount * monthlyRate / 12).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
                    } else if (selectedDetail.monthly && selectedDetail.monthly.toLowerCase().includes('not available')) {
                        monthlyInterestCalcDisplay = "Not Available";
                    }

                    let annualInterestCalcDisplay = 'N/A';
                    if (selectedDetail.yearly && selectedDetail.yearly.toLowerCase() !== 'not available' && selectedDetail.yearly.endsWith('%')) {
                        const annualRate = parseFloat(selectedDetail.yearly) / 100;
                        annualInterestCalcDisplay = `₹ ${(amount * annualRate).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
                    } else if (selectedDetail.yearly && selectedDetail.yearly.toLowerCase().includes('not available')) {
                        annualInterestCalcDisplay = "Not Available";
                    }
                    
                    data.push([
                        amount.toLocaleString('en-IN'),
                        monthlyInterestCalcDisplay,
                        annualInterestCalcDisplay,
                        selectedDetail.period,
                        selectedDetail.remarks
                    ]);
                }
            }
        } else {
            showDownloadMessage('Calculator results not included in Excel. Please enter a valid amount for selected product option.', true, targetMessageDiv);
        }
    }

    if (data.length <= 1) { // Only headers or no data (after potential initial headers)
        showDownloadMessage('No relevant data to export to Excel.', true, targetMessageDiv);
        return;
    }

    try {
        const ws = XLSX.utils.aoa_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Investment Data");
        XLSX.writeFile(wb, getFileName(reportType === 'company' ? 'company' : 'product', 'xlsx'));
        showDownloadMessage('Excel file generated successfully!', false, targetMessageDiv);
    } catch (error) {
        console.error('Error generating Excel:', error);
        showDownloadMessage('Failed to generate Excel file. Please try again. Check console for details.', true, targetMessageDiv);
    }
}


// Event Listeners for Download Modal
openDownloadModalBtn.addEventListener('click', (e) => {
    e.preventDefault();
    downloadModal.classList.add('active');
    // Ensure the modal's prompt and buttons are updated based on current selection
    setDownloadButtonState(companySelect.value, productSelect.value, parseFloat(investmentAmountInput.value));
    showDownloadMessage('', false, modalDownloadMessage); // Clear any previous messages in the modal
});

closeModalBtn.addEventListener('click', () => {
    downloadModal.classList.remove('active');
});

// Close modal if clicked outside content
downloadModal.addEventListener('click', (e) => {
    if (e.target === downloadModal) {
        downloadModal.classList.remove('active');
    }
});


// Event Listeners for specific download types (from modal)
downloadCompanyPdfBtn.addEventListener('click', () => downloadMainReport('company', 'pdf'));
downloadCompanyExcelBtn.addEventListener('click', () => downloadExcelReport('company', companySelect.value, null, null, null, modalDownloadMessage));
downloadProductPdfBtn.addEventListener('click', () => downloadMainReport('product', 'pdf'));
downloadProductImageBtn.addEventListener('click', () => downloadMainReport('product', 'png'));
downloadProductExcelBtn.addEventListener('click', () => downloadExcelReport('product', companySelect.value, productSelect.value, currentSelectedDetailForCalc, parseFloat(investmentAmountInput.value), modalDownloadMessage));


// Event Listeners for main controls
companySelect.addEventListener('change', (event) => {
    const selectedCompany = event.target.value;
    populateProductSelect(selectedCompany);
});

productSelect.addEventListener('change', (event) => {
    const selectedProduct = event.target.value;
    const selectedCompany = companySelect.value;
    displayProductDetails(selectedCompany, selectedProduct);
});

// Listener for amount input
investmentAmountInput.addEventListener('input', () => {
    calculateInvestmentReturns();
});


// Smooth scroll for calculator link
document.querySelector('.main-nav a[href="#calculator-area"]').addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
    });
});

// Initial state (ensures calculator clears if nothing is selected initially)
populateProductSelect(''); // This will call setDownloadButtonState initially