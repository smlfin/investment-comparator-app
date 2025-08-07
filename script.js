// Increment CACHE_NAME for Service Worker update to force fresh load of ALL files
const CACHE_NAME = 'investment-comparator-v48'; // NEW VERSION
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
    // Add image paths for service worker cache (still cache them if they exist as files, but won't display)
    './images/sml.jpeg',
    './images/vfl.jpeg',
    './images/snl.jpeg',
    './images/default.jpeg' // Ensure default image is cached
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
            { "id": "sml-sd-1", "monthly": "12.5%", "yearly": "13.0%", "period": "5.5 YEARS", "remarks": "5000 to less than 5 Lakhs", "generalRemark": "No Premature Closing Allowed", "image": "./images/sml.jpeg" },
            { "id": "sml-sd-2", "monthly": "13.0%", "yearly": "13.5%", "period": "5.5 YEARS", "remarks": "5 Lakhs to less than 25 Lakhs", "generalRemark": "No Premature Closing Allowed", "image": "./images/sml.jpeg" },
            { "id": "sml-sd-3", "monthly": "14.0%", "yearly": "14.5%", "period": "5.5 YEARS", "remarks": "25 Lakhs & above", "generalRemark": "No Premature Closing Allowed", "image": "./images/sml.jpeg" }
        ],
        "Doubling Scheme": [
            { "id": "sml-doubling-1", "period": "6 YEARS", "remarks": "5000 & Above", "doublingRemark": "Doubles on maturity.", "generalRemark": "No Premature Closing Allowed", "image": "./images/sml.jpeg" }
        ],
        "Non-Convertible Debentures (NCD)": [
            {
                "id": "sml-ncd-1",
                "monthly": "12.5%",
                "yearly": "Not Available",
                "period": "1-10 Years", // Simplified for dropdown
                "remarks": "2 Lakhs to less than 15 Lakhs",
                "closureRemark": "Closure allowed after 1 year.",
                "closureTerms": [
                    { "period": "Between 1 & 2 year", "cut": "1%" },
                    { "period": "Between 2 & 3 year", "cut": ".50%" },
                    { "period": "After 3 year", "cut": "No cut" },
                    { "period": "If closed after 3 years & between 2 Anniversary Years", "cut": "Effective Rate: 9%" }
                ],
                "image": "./images/sml.jpeg"
            },
            {
                "id": "sml-ncd-2",
                "monthly": "13%",
                "yearly": "Not Available",
                "period": "1-10 Years", // Simplified for dropdown
                "remarks": "15 Lakhs & above",
                "closureRemark": "Closure allowed after 1 year.",
                "closureTerms": [
                    { "period": "Between 1 & 2 year", "cut": "1%" },
                    { "period": "Between 2 & 3 year", "cut": ".50%" },
                    { "period": "After 3 year", "cut": "No cut" },
                    { "period": "If closed after 3 years & between 2 Anniversary Years", "cut": "Effective Rate: 9%" }
                ],
                "image": "./images/sml.jpeg"
            }
        ]
    },
    "Vanchinad Finance (P) Ltd": {
        "SD 5.5 Year": [
            { "id": "vfl-sd-1", "monthly": "12%", "yearly": "12.50%", "period": "5.5 YEARS", "remarks": "5000 to less than 5 Lakhs", "generalRemark": "No Premature Closing Allowed", "image": "./images/vfl.jpeg" },
            { "id": "vfl-sd-2", "monthly": "12.50%", "yearly": "13%", "period": "5.5 YEARS", "remarks": "5 Lakhs to less than 25 Lakhs", "generalRemark": "No Premature Closing Allowed", "image": "./images/vfl.jpeg" },
            { "id": "vfl-sd-3", "monthly": "13.50%", "yearly": "14%", "period": "5.5 YEARS", "remarks": "25 Lakhs & above", "generalRemark": "No Premature Closing Allowed", "image": "./images/vfl.jpeg" }
        ],
        "Sub - ordinated Debt Doubling Scheme": [
            { "id": "vfl-doubling-1", "period": "6 YEARS", "remarks": "5000 & Above", "doublingRemark": "Doubles on maturity.", "generalRemark": "No Premature Closing Allowed", "image": "./images/vfl.jpeg" }
        ],
        "Non-Convertible Debentures (NCD)": [
            {
                "id": "vfl-ncd-1",
                "monthly": "12.5%",
                "yearly": "13.0%",
                "period": "1-10 Years", // Simplified for dropdown
                "remarks": "5 Lakhs to less than 15 Lakhs",
                "closureRemark": "Closure allowed after 1 year.",
                "closureTerms": [
                    { "period": "Between 1 & 2 year", "cut": "2%" },
                    { "period": "Between 2 & 3 year", "cut": "1%" },
                    { "period": "After 3 year", "cut": "No cut" },
                    { "period": "If closed after 3 years & between 2 Anniversary Years", "cut": "Effective Rate: 9%" }
                ],
                "image": "./images/vfl.jpeg"
            },
            {
                "id": "vfl-ncd-2",
                "monthly": "13.0%",
                "yearly": "13.5%",
                "period": "1-10 Years", // Simplified for dropdown
                "remarks": "15 Laksh & above",
                "closureRemark": "Closure allowed after 1 year.",
                "closureTerms": [
                    { "period": "Between 1 & 2 year", "cut": "2%" },
                    { "period": "Between 2 & 3 year", "cut": "1%" },
                    { "period": "After 3 year", "cut": "No cut" },
                    { "period": "If closed after 3 years & between 2 Anniversary Years", "cut": "Effective Rate: 9%" }
                ],
                "image": "./images/vfl.jpeg"
            }
        ]
    },
    "SANGEETH NIDHI": {
        "Sangeeth Nidhi Deposits": [
            { "id": "snl-fd-1", "period": "6 MONTHS to Less than 1 Year", "yearly": "9%", "remarks": "5000 and above", "generalRemark": "No premature closure.", "image": "./images/snl.jpeg" },
            {
                "id": "snl-fd-2",
                "period": "1 Year to 5 Years",
                "monthly": "12%",
                "yearly": "12.50%",
                "remarks": "5000 and above",
                "generalRemark": "Premature closure allowed after 1 year.",
                "closureTerms": [
                    { "period": "After 1 Year", "cut": "2%" } // New closure term
                ],
                "image": "./images/snl.jpeg"
            }
        ]
    },
    "RD Calculator": {
        "Recurring Deposit (RD)": [
            { "id": "rd-calc-1", "period": "1 to 5 Years", "remarks": "Monthly Deposit of ₹1000 and above", "annualRatePercentage": 12.12, "generalRemark": "RD calculations are estimates. The final maturity value is subject to the actual interest rate and deposit schedule.", "image": "./images/default.jpeg" }
        ]
    }
};

// Hardcoded RD maturity values based on customer feedback for a ₹1000 monthly deposit
const rdMaturityValues = {
    1: 12809,
    2: 27243,
    3: 43507,
    4: 61834,
    5: 82485
};


// DOM Elements
const companySelect = document.getElementById('company-select');
const productSelect = document.getElementById('product-select');

// Elements for "All Options" view
const allOptionsView = document.getElementById('all-options-view');
const selectedCompanyNameAll = document.getElementById('selected-company-name-all');
const selectedProductNameAll = document.getElementById('selected-product-name-all');
const productOptionsGrid = document.getElementById('product-options-grid');

// Elements for "Single Option + Calculator" view
const singleOptionCalculatorView = document.getElementById('single-option-calculator-view');
const selectedCompanyNameSingle = document.getElementById('selected-company-name-single');
const selectedProductNameSingle = document.getElementById('selected-product-name-single');
const selectedProductDetailCard = document.getElementById('selected-product-detail-card');
const changeOptionButton = document.getElementById('change-option-button');

const investmentAmountInput = document.getElementById('investment-amount');
const investmentPeriodInput = document.getElementById('investment-period');
const periodInputGroup = document.getElementById('period-input-group');
const calculatorResultsDiv = document.getElementById('calculator-results');
const goToCalculatorLink = document.getElementById('go-to-calculator-link');
const calculateButton = document.getElementById('calculate-button');
const rdMonthlyTransferGroup = document.getElementById('rd-monthly-transfer-group');
const rdMonthlyTransferPeriodSelect = document.getElementById('rd-monthly-transfer-period');

// Global state variables
let currentSelectedProductOptions = [];
let currentSelectedProductType = '';
let currentSelectedDetailForCalc = null;
let currentSelectedDetailIndex = -1;

let allowedMinAmount = 0;
let allowedMaxAmount = Infinity;
let specificAmountRequired = false;

// --- Amount Constraint Management ---
function resetAmountConstraints() {
    allowedMinAmount = 0;
    allowedMaxAmount = Infinity;
    specificAmountRequired = false;
    investmentAmountInput.classList.remove('invalid-input');
    investmentAmountInput.placeholder = 'Enter Investment Amount';
}

function setAmountConstraints(detail) {
    let min = 0;
    let max = Infinity;
    let specific = false;
    let placeholderText = 'Enter Investment Amount';

    if (detail && detail.remarks) {
        const remarks = detail.remarks.toLowerCase();

        const aboveMatch = remarks.match(/(\d+)\s*lakhs?\s*&\s*above/);
        if (aboveMatch) {
            min = parseFloat(aboveMatch[1]) * 100000;
            placeholderText = `Enter ₹ ${min.toLocaleString('en-IN')} or more`;
        } else {
            const numAboveMatch = remarks.match(/(\d+)\s*and\s*above/);
            if (numAboveMatch) {
                min = parseFloat(numAboveMatch[1]);
                placeholderText = `Enter ₹ ${min.toLocaleString('en-IN')} or more`;
            }
        }

        const betweenMatch = remarks.match(/(\d+)\s*lakhs?\s*to\s*less\s*than\s*(\d+)\s*lakhs?/);
        if (betweenMatch) {
            min = parseFloat(betweenMatch[1]) * 100000;
            max = parseFloat(betweenMatch[2]) * 100000 - 1;
            placeholderText = `Enter between ₹ ${min.toLocaleString('en-IN')} and ₹ ${(max + 1).toLocaleString('en-IN')}`;
        }
        const betweenLakhsMatch = remarks.match(/(\d+)\s*laksh\s*to\s*less\s*than\s*(\d+)\s*laksh/); // Typo in data 'laksh'
        if (betweenLakhsMatch) {
            min = parseFloat(betweenLakhsMatch[1]) * 100000;
            max = parseFloat(betweenLakhsMatch[2]) * 100000 - 1;
            placeholderText = `Enter between ₹ ${min.toLocaleString('en-IN')} and ₹ ${(max + 1).toLocaleString('en-IN')}`;
        }

        if (companySelect.value === "RD Calculator" && productSelect.value === "Recurring Deposit (RD)") {
            const rdAmountMatch = remarks.match(/(\d+)\s*and\s*above/);
            if (rdAmountMatch) {
                min = parseFloat(rdAmountMatch[1]);
                max = Infinity;
                placeholderText = `Enter ₹ ${min.toLocaleString('en-IN')} or more`;
            }
        }
    }

    allowedMinAmount = min;
    allowedMaxAmount = max;
    specificAmountRequired = specific;
    investmentAmountInput.placeholder = placeholderText;
}


// --- UI View Management Functions ---

function showAllOptionsView() {
    singleOptionCalculatorView.classList.add('hidden');
    allOptionsView.classList.remove('hidden');
    investmentAmountInput.value = '';
    investmentPeriodInput.value = '';
    rdMonthlyTransferGroup.classList.add('hidden');
    calculatorResultsDiv.innerHTML = '<p class="placeholder-text">Enter an amount and select a product option above to calculate returns.</p>';
    resetAmountConstraints();
    selectedCompanyNameAll.textContent = companySelect.value ? companySelect.value : '';
    selectedProductNameAll.textContent = productSelect.value ? productSelect.value : '';
    companySelect.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function showSingleOptionCalculatorView() {
    allOptionsView.classList.add('hidden');
    singleOptionCalculatorView.classList.remove('hidden');
    selectedCompanyNameSingle.textContent = companySelect.value ? companySelect.value : '';
    selectedProductNameSingle.textContent = productSelect.value ? productSelect.value : '';
    singleOptionCalculatorView.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// --- Data Population and Display Functions ---

// Function to populate the company select dropdown
function populateCompanySelect() {
    companySelect.innerHTML = '<option value="">-- Select a company --</option>';
    for (const companyName in investmentData) {
        const option = document.createElement('option');
        option.value = companyName;
        option.textContent = companyName;
        companySelect.appendChild(option);
    }
}


function populateProductSelect(companyName) {
    productSelect.innerHTML = '<option value="">-- Select a product type --</option>';
    productSelect.disabled = true;
    selectedProductNameAll.textContent = '';
    selectedCompanyNameAll.textContent = companyName ? companyName : '';
    productOptionsGrid.innerHTML = '<p class="placeholder-text">Select a company and a product type to view available options.</p>';

    showAllOptionsView();
    currentSelectedDetailForCalc = null;
    currentSelectedDetailIndex = -1;
    resetAmountConstraints();

    if (companyName && investmentData[companyName]) {
        const products = Object.keys(investmentData[companyName]);
        products.forEach(product => {
            const option = document.createElement('option');
            option.value = product;
            option.textContent = product;
            productSelect.appendChild(option);
        });
        productSelect.disabled = false;

        if (companyName === "RD Calculator" && products.includes("Recurring Deposit (RD)")) {
            productSelect.value = "Recurring Deposit (RD)";
            productSelect.dispatchEvent(new Event('change'));
        }
    }
}


function displayProductOptions(companyName, productName) {
    productOptionsGrid.innerHTML = '';
    selectedCompanyNameAll.textContent = companyName ? companyName : '';
    selectedProductNameAll.textContent = productName ? productName : '';

    currentSelectedProductOptions = [];
    currentSelectedProductType = productName;
    currentSelectedDetailForCalc = null;
    currentSelectedDetailIndex = -1;
    resetAmountConstraints();
    showAllOptionsView();
    
    // Check for NCD unavailability message
    if (companyName === "Vanchinad Finance (P) Ltd" && productName === "Non-Convertible Debentures (NCD)") {
        productOptionsGrid.innerHTML = `
            <div class="no-ncd-message">
                <p><strong>Currently no NCD issue available. Kindly Opt SML NCD.</strong></p>
            </div>
        `;
        return;
    }

    if (companyName && productName && investmentData[companyName] && investmentData[companyName][productName]) {
        const detailsArray = investmentData[companyName][productName];
        currentSelectedProductOptions = detailsArray;
        
        // Explicitly check for doubling scheme to apply correct logic
        const isDoublingProduct = productName.toLowerCase().includes('doubling');

        detailsArray.forEach((detail, index) => {
            const card = document.createElement('div');
            card.classList.add('product-card');
            card.setAttribute('data-index', index);
            card.addEventListener('click', () => {
                handleOptionSelection(index, card);
            });

            const sanitizedCompanyName = companyName.replace(/[^a-zA-Z0-9]/g, '');
            const sanitizedProductName = productName.replace(/[^a-zA-Z0-9]/g, '');
            const radioGroupName = `${sanitizedCompanyName}-${sanitizedProductName}-option`;
            const radioId = `option-${sanitizedCompanyName}-${sanitizedProductName}-${index}`;

            let displayLabel = "For Amount:";
            let displayValue = detail.remarks || 'No specific remarks.';
            
            if (isDoublingProduct || companyName === "SANGEETH NIDHI" || (companyName === "RD Calculator" && productName === "Recurring Deposit (RD)")) {
                displayLabel = "For Period/Type:";
                displayValue = detail.period || 'Not specified';
            } else {
                displayValue = displayValue.replace(/^(Between\s|between\s)/, '');
                displayValue = displayValue.replace(/\sbetween\s/ig, ' ');
                displayValue = displayValue.trim();
            }

            let cardContent = `
                <div class="card-content">
                    <input type="radio" class="product-option-select" name="${radioGroupName}" id="${radioId}" value="${index}" ${currentSelectedDetailIndex === index ? 'checked' : ''}>
                    <label for="${radioId}">
                        <h4>Option ${index + 1}</h4>
                        <p><strong>${displayLabel}</strong> ${displayValue}</p>
                    </label>
            `;

            if (detail.doublingRemark) {
                cardContent += `<p><strong>Remarks:</strong> ${detail.doublingRemark}</p>`;
            } else if (productName.toLowerCase().includes('ncd') || (companyName === "SANGEETH NIDHI" && (detail.period.includes("1 Year to 5 Years") || detail.period.includes("6 MONTHS")))) {
                cardContent += `
                    <p><strong>Monthly Interest:</strong> ${detail.monthly || 'N/A'}</p>
                    <p><strong>Yearly Interest:</strong> ${detail.yearly || 'N/A'}</p>
                `;
                if (detail.closureRemark) {
                    cardContent += `<p><strong>Closure Remark:</strong> ${detail.closureRemark}</p>`;
                }
            } else if (!productName.toLowerCase().includes('rd')) {
                if (detail.monthly) {
                    cardContent += `<p><strong>Monthly Interest:</strong> ${detail.monthly}</p>`;
                }
                if (detail.yearly) {
                    cardContent += `<p><strong>Yearly Interest:</strong> ${detail.yearly}</p>`;
                }
            }

            if (detail.generalRemark) {
                cardContent += `<p class="general-remark"><strong>Important:</strong> ${detail.generalRemark}</p>`;
            }

            cardContent += `
                    <button class="select-option-button">Select & Calculate</button>
                </div>
            `;
            card.innerHTML = cardContent;
            productOptionsGrid.appendChild(card);

            card.querySelector('.select-option-button').addEventListener('click', (e) => {
                e.stopPropagation();
                handleOptionSelection(index, card);
            });
        });

        if (companyName === "RD Calculator" && productName === "Recurring Deposit (RD)" && detailsArray.length > 0) {
            const firstCard = productOptionsGrid.querySelector('.product-card');
            if (firstCard) {
                handleOptionSelection(0, firstCard);
            }
        }
    } else {
        productOptionsGrid.innerHTML = '<p class="placeholder-text">Select a company and a product type to view available options.</p>';
    }
}


function handleOptionSelection(index, clickedCard) {
    const previouslySelectedCard = document.querySelector('.product-card.selected');
    if (previouslySelectedCard) {
        previouslySelectedCard.classList.remove('selected');
    }

    clickedCard.classList.add('selected');
    const radioElement = clickedCard.querySelector('.product-option-select');
    if (radioElement) {
        radioElement.checked = true;
    }

    currentSelectedDetailForCalc = currentSelectedProductOptions[index];
    currentSelectedDetailIndex = index;
    setAmountConstraints(currentSelectedDetailForCalc);
    displaySingleProductDetailsAndCalculator(companySelect.value, productSelect.value, currentSelectedDetailForCalc);
    showSingleOptionCalculatorView();
}


function displaySingleProductDetailsAndCalculator(companyName, productName, detail) {
    if (!detail) {
        selectedProductDetailCard.innerHTML = '<p class="placeholder-text">No option selected for detailed view.</p>';
        calculatorResultsDiv.innerHTML = '<p class="placeholder-text">Select an option to calculate returns.</p>';
        periodInputGroup.style.display = 'none';
        rdMonthlyTransferGroup.classList.add('hidden');
        investmentPeriodInput.value = '';
        return;
    }

    selectedCompanyNameSingle.textContent = companyName;
    selectedProductNameSingle.textContent = productName;
    const isDoublingProduct = productName.toLowerCase().includes('doubling');
    const isNCDProduct = productName.toLowerCase().includes('ncd');
    const isRDProduct = (companyName === "RD Calculator" && productName === "Recurring Deposit (RD)");
    const isSDProduct = productName.toLowerCase().includes('sd 5.5 year');
    const isSangeethNidhiProduct = companyName === "SANGEETH NIDHI";
    const isSangeethNidhi1To5Years = isSangeethNidhiProduct && detail.period.includes("1 Year to 5 Years");
    const isSangeethNidhi6MonthsToLess1Year = isSangeethNidhiProduct && detail.period.includes("6 MONTHS to Less than 1 Year");
    let cardContent = `
        <div class="card-content">
            <h4>Option ${currentSelectedDetailIndex + 1}</h4>
    `;

    investmentPeriodInput.innerHTML = '';
    investmentPeriodInput.type = 'number';
    investmentPeriodInput.readOnly = false;
    investmentPeriodInput.disabled = false;
    investmentPeriodInput.style.display = 'block';
    periodInputGroup.style.display = 'flex';
    rdMonthlyTransferGroup.classList.add('hidden');
    
    if (isDoublingProduct) {
        periodInputGroup.style.display = 'none';
        investmentPeriodInput.value = '';
        investmentPeriodInput.readOnly = true;
        investmentPeriodInput.disabled = true;
    } else if (isNCDProduct || isSangeethNidhi1To5Years) {
        periodInputGroup.style.display = 'flex';
        investmentPeriodInput.type = 'number';
        investmentPeriodInput.min = '1';
        let maxYears;
        if (isNCDProduct) {
            maxYears = 10;
            investmentPeriodInput.placeholder = 'Enter Period (1-10 Years)';
        } else if (isSangeethNidhi1To5Years) {
            maxYears = 5;
            investmentPeriodInput.placeholder = 'Enter Period (1-5 Years)';
        }
        investmentPeriodInput.max = maxYears;
        
        const periodMatch = detail.period.match(/(\d+)\s*Years?/i);
        if (periodMatch) {
            const defaultPeriod = parseInt(periodMatch[1]);
            if (!isNaN(defaultPeriod) && defaultPeriod <= maxYears) {
                investmentPeriodInput.value = defaultPeriod;
            } else if (isSangeethNidhi1To5Years && maxYears === 5) {
                investmentPeriodInput.value = 5;
            } else {
                investmentPeriodInput.value = '';
            }
        } else if (isSangeethNidhi1To5Years) {
            investmentPeriodInput.value = 5;
        } else {
            investmentPeriodInput.value = '';
        }
        investmentPeriodInput.readOnly = false;
        investmentPeriodInput.disabled = false;
        
        rdMonthlyTransferGroup.classList.remove('hidden');
        
    } else if (isSDProduct || isSangeethNidhi6MonthsToLess1Year) {
        periodInputGroup.style.display = 'none';
        investmentPeriodInput.value = '';
        investmentPeriodInput.readOnly = true;
        investmentPeriodInput.disabled = true;
        
        if (!isDoublingProduct) {
             rdMonthlyTransferGroup.classList.remove('hidden');
        }
    } else if (isRDProduct) {
        periodInputGroup.style.display = 'flex';
        investmentPeriodInput.type = 'number';
        investmentPeriodInput.min = '1';
        investmentPeriodInput.max = '5';
        investmentPeriodInput.value = '';
        investmentPeriodInput.placeholder = 'Enter Period (1-5 Years)';
        rdMonthlyTransferGroup.classList.add('hidden');
        investmentPeriodInput.readOnly = false;
        investmentPeriodInput.disabled = false;
    } else {
        periodInputGroup.style.display = 'flex';
        investmentPeriodInput.type = 'number';
        investmentPeriodInput.min = '1';
        investmentPeriodInput.max = '10';
        investmentPeriodInput.value = '';
        investmentPeriodInput.readOnly = false;
        investmentPeriodInput.disabled = false;
        rdMonthlyTransferGroup.classList.add('hidden');
    }

    investmentPeriodInput.addEventListener('input', updateRDTransferPeriodOptions);

    function updateRDTransferPeriodOptions() {
        let maxYears = parseInt(investmentPeriodInput.value);
        let rdDefault = null;
        if (isSDProduct) {
             maxYears = 5;
             rdDefault = 5;
        } else {
            if (isNaN(maxYears) || maxYears < 1) maxYears = 0;
        }

        rdMonthlyTransferPeriodSelect.innerHTML = '<option value="">-- Select a period --</option>';
        if (maxYears > 0) {
            for (let i = 1; i <= maxYears; i++) {
                const option = document.createElement('option');
                option.value = i;
                option.textContent = `${i} Year${i > 1 ? 's' : ''}`;
                rdMonthlyTransferPeriodSelect.appendChild(option);
            }
        }
        if (rdDefault) {
            rdMonthlyTransferPeriodSelect.value = rdDefault;
        }
    }

    if (detail.doublingRemark) {
        cardContent += `<p><strong>Remarks:</strong> ${detail.doublingRemark}</p>`;
    } else if (isNCDProduct || isSangeethNidhi1To5Years) {
        cardContent += `
            <p><strong>Monthly Interest:</strong> ${detail.monthly || 'N/A'}</p>
            <p><strong>Yearly Interest:</strong> ${detail.yearly || 'N/A'}</p>
        `;
        if (detail.closureRemark) {
            cardContent += `<p><strong>Closure Remark:</strong> ${detail.closureRemark}</p>`;
        }
    } else if (!isRDProduct) {
        if (detail.monthly) {
            cardContent += `<p><strong>Monthly Interest:</strong> ${detail.monthly}</p>`;
        }
        if (detail.yearly) {
            cardContent += `<p><strong>Yearly Interest:</strong> ${detail.yearly}</p>`;
        }
    } else if (isRDProduct) {
        cardContent += `
            <p><strong>Remarks:</strong> ${detail.remarks}</p>
            <p><strong>Annual Interest Rate:</strong> 12%</p>
        `;
    }

    if (detail.generalRemark) {
        cardContent += `<p class="general-remark"><strong>Important:</strong> ${detail.generalRemark}</p>`;
    }
    cardContent += '</div>';

    selectedProductDetailCard.innerHTML = cardContent;

    updateRDTransferPeriodOptions();
}


function calculateInvestmentReturns() {
    const company = companySelect.value;
    const product = productSelect.value;
    const amount = parseFloat(investmentAmountInput.value);
    let period = parseInt(investmentPeriodInput.value);
    const rdTransferPeriod = parseInt(rdMonthlyTransferPeriodSelect.value);
    const resultsDiv = document.getElementById('calculator-results');

    if (!amount || isNaN(amount) || amount < allowedMinAmount || amount > allowedMaxAmount) {
        const minDisplay = allowedMinAmount.toLocaleString('en-IN');
        const maxDisplay = allowedMaxAmount === Infinity ? 'or more' : `and ₹ ${(allowedMaxAmount + 1).toLocaleString('en-IN')}`;
        resultsDiv.innerHTML = `<p class="error-text">Please enter a valid amount between ₹ ${minDisplay} ${maxDisplay}</p>`;
        investmentAmountInput.classList.add('invalid-input');
        return;
    }
    investmentAmountInput.classList.remove('invalid-input');

    const isSDProduct = product.toLowerCase().includes('sd 5.5 year');
    const isDoublingProduct = product.toLowerCase().includes('doubling');
    const isRDProduct = product.toLowerCase().includes('rd');

    if (currentSelectedDetailForCalc.period) {
        const periodMatch = currentSelectedDetailForCalc.period.match(/(\d+)\s*Years?/i);
        if (periodMatch && !period) {
            period = parseInt(periodMatch[1]);
        }
    }

    if (!period && !isDoublingProduct && !isRDProduct && !isSDProduct) {
        resultsDiv.innerHTML = `<p class="error-text">Please enter a valid investment period.</p>`;
        investmentPeriodInput.classList.add('invalid-input');
        return;
    }
    investmentPeriodInput.classList.remove('invalid-input');

    let resultsHTML = '';
    
    // Function to calculate RD maturity value
    function calculateRDMaturity(monthlyDeposit, years) {
        let maturity = 0;
        let totalPrincipal = 0;
        const rdAnnualRate = 0.1212;
        const quarterlyRate = rdAnnualRate / 4;
    
        if (monthlyDeposit === 1000) {
             if (rdMaturityValues[years]) {
                maturity = rdMaturityValues[years];
             } else {
                 // For cases beyond 5 years or other amounts, fall back to formula
                 let currentPrincipal = 0;
                 for (let month = 1; month <= (12 * years); month++) {
                     currentPrincipal += monthlyDeposit;
                     if (month % 3 === 0) {
                         currentPrincipal += currentPrincipal * quarterlyRate;
                     }
                 }
                maturity = currentPrincipal;
             }
        } else {
            const baseAmount = 1000;
            const multiplier = monthlyDeposit / baseAmount;
            if (rdMaturityValues[years]) {
                 maturity = rdMaturityValues[years] * multiplier;
            } else {
                // Generic calculation for other amounts/periods
                 let currentPrincipal = 0;
                 for (let month = 1; month <= (12 * years); month++) {
                     currentPrincipal += monthlyDeposit;
                     if (month % 3 === 0) {
                         currentPrincipal += currentPrincipal * quarterlyRate;
                     }
                 }
                maturity = currentPrincipal;
            }
        }
        return maturity;
    }

    // --- Start of corrected calculation logic ---
    if (isDoublingProduct) {
        const finalAmount = amount * 2;
        const totalInterest = finalAmount - amount;
        resultsHTML = `
            <h3>Doubling Scheme Returns</h3>
            <p><strong>Initial Investment:</strong> ₹ ${Math.round(amount).toLocaleString('en-IN')}</p>
            <p><strong>Period:</strong> ${currentSelectedDetailForCalc.period}</p>
            <p><strong>Total Interest Earned:</strong> ₹ ${Math.round(totalInterest).toLocaleString('en-IN')}</p>
            <p><strong>Final Maturity Value:</strong> ₹ ${Math.round(finalAmount).toLocaleString('en-IN')}</p>
        `;
    } else if (isRDProduct) {
        resultsHTML += `<h3>RD Returns Calculation</h3>`;
        resultsHTML += `<p><strong>Note:</strong> The monthly interest is compounded quarterly.</p>`;
        
        let totalPrincipal = 0;
        let totalInterest = 0;
        let maturityValue = 0;

        const monthlyDeposit = amount;
        
        resultsHTML += `
            <div class="table-container">
                <table class="rd-returns-table">
                    <thead>
                        <tr>
                            <th>Year</th>
                            <th>Principal Deposited</th>
                            <th>Interest Earned</th>
                            <th>Maturity Value</th>
                        </tr>
                    </thead>
                    <tbody>
        `;

        const baseAmount = 1000;
        const multiplier = monthlyDeposit / baseAmount;

        for (let year = 1; year <= period; year++) {
            totalPrincipal = monthlyDeposit * 12 * year;
            let baseMaturity = rdMaturityValues[year] || 0;
            maturityValue = baseMaturity * multiplier;
            totalInterest = maturityValue - totalPrincipal;
            
            resultsHTML += `
                <tr>
                    <td>${year}</td>
                    <td>₹ ${Math.round(totalPrincipal).toLocaleString('en-IN')}</td>
                    <td>₹ ${Math.round(totalInterest).toLocaleString('en-IN')}</td>
                    <td>₹ ${Math.round(maturityValue).toLocaleString('en-IN')}</td>
                </tr>
            `;
        }
        
        resultsHTML += `
                    </tbody>
                </table>
            </div>
            <div class="summary-results">
                <p><strong>Total Principal Deposited:</strong> ₹ ${Math.round(totalPrincipal).toLocaleString('en-IN')}</p>
                <p><strong>Total Interest Earned:</strong> ₹ ${Math.round(totalInterest).toLocaleString('en-IN')}</p>
                <p><strong>Final Maturity Value:</strong> ₹ ${Math.round(maturityValue).toLocaleString('en-IN')}</p>
            </div>
        `;

    } else { // Fixed/NCD/Sangeeth Nidhi Deposits
        
        let primaryInvestmentPeriod = isSDProduct ? 5.5 : period;
        let rdReinvestmentPeriod = isSDProduct ? 5 : rdTransferPeriod;
        
        let resultsForMonthly = '';
        if (currentSelectedDetailForCalc.monthly && currentSelectedDetailForCalc.monthly !== 'Not Available') {
            const monthlyRate = parseFloat(currentSelectedDetailForCalc.monthly) / 100;
            const monthlyInterest = amount * monthlyRate / 12;
            const totalInterestPrimary = (amount * monthlyRate) * primaryInvestmentPeriod;
            const maturityValuePrimary = amount + totalInterestPrimary;
            resultsForMonthly = `
                <h4>Calculation based on Monthly Interest Payout</h4>
                <p><strong>Monthly Interest Payout:</strong> ₹ ${Math.round(monthlyInterest).toLocaleString('en-IN')}</p>
                <p><strong>Total Interest Earned:</strong> ₹ ${Math.round(totalInterestPrimary).toLocaleString('en-IN')}</p>
                <p><strong>Final Maturity Value:</strong> ₹ ${Math.round(maturityValuePrimary).toLocaleString('en-IN')}</p>
            `;

            if (rdTransferPeriod > 0) {
                const rdMaturity = calculateRDMaturity(monthlyInterest, rdReinvestmentPeriod);
                const totalRdDeposits = monthlyInterest * 12 * rdReinvestmentPeriod;
                const rdInterestEarned = rdMaturity - totalRdDeposits;
                const combinedMaturity = maturityValuePrimary + rdInterestEarned;
                const extraEarnings = rdInterestEarned;

                resultsForMonthly += `
                    <div class="reinvestment-summary">
                        <h4>Reinvestment in RD with Monthly Interest</h4>
                        <p>The monthly interest of ₹ ${Math.round(monthlyInterest).toLocaleString('en-IN')} is deposited into an RD for ${rdReinvestmentPeriod} years.</p>
                        <p><strong>Total Extra Earnings by reinvesting in RD:</strong> ₹ ${Math.round(extraEarnings).toLocaleString('en-IN')}</p>
                        <p><strong>Total Combined Maturity (Primary + RD):</strong> ₹ ${Math.round(combinedMaturity).toLocaleString('en-IN')}</p>
                    </div>
                `;
            }
        }
        
        let resultsForYearly = '';
        if (currentSelectedDetailForCalc.yearly && currentSelectedDetailForCalc.yearly !== 'Not Available') {
            const yearlyRate = parseFloat(currentSelectedDetailForCalc.yearly) / 100;
            const yearlyInterest = amount * yearlyRate;
            const totalInterestYearly = yearlyInterest * primaryInvestmentPeriod;
            const maturityValueYearly = amount + totalInterestYearly;
            resultsForYearly = `
                <h4>Calculation based on Yearly Interest Payout</h4>
                <p><strong>Yearly Interest Payout:</strong> ₹ ${Math.round(yearlyInterest).toLocaleString('en-IN')}</p>
                <p><strong>Total Interest Earned:</strong> ₹ ${Math.round(totalInterestYearly).toLocaleString('en-IN')}</p>
                <p><strong>Final Maturity Value:</strong> ₹ ${Math.round(maturityValueYearly).toLocaleString('en-IN')}</p>
            `;
        }

        resultsHTML = `
            <h3>Investment Returns Calculation</h3>
            <p><strong>Initial Investment:</strong> ₹ ${Math.round(amount).toLocaleString('en-IN')}</p>
            <p><strong>Period:</strong> ${primaryInvestmentPeriod} Year${primaryInvestmentPeriod > 1 ? 's' : ''}</p>
            ${resultsForMonthly}
            ${resultsForYearly}
        `;
    }

    resultsDiv.innerHTML = resultsHTML;
}


// --- Event Listeners ---
companySelect.addEventListener('change', (e) => {
    populateProductSelect(e.target.value);
});

productSelect.addEventListener('change', (e) => {
    const companyName = companySelect.value;
    const productName = e.target.value;
    displayProductOptions(companyName, productName);
});

calculateButton.addEventListener('click', calculateInvestmentReturns);
changeOptionButton.addEventListener('click', showAllOptionsView);

goToCalculatorLink.addEventListener('click', (e) => {
    if (singleOptionCalculatorView.classList.contains('hidden')) {
        e.preventDefault();
        alert('Please select a product option first to use the calculator.');
    }
});


document.addEventListener('DOMContentLoaded', () => {
    populateCompanySelect();
});
