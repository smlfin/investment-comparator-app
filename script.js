// Increment CACHE_NAME for Service Worker update to force fresh load of ALL files
<<<<<<< HEAD
const CACHE_NAME = 'investment-comparator-v34'; // NEW VERSION with SD 5.5 Year extra amount correctly fixed
=======
const CACHE_NAME = 'investment-comparator-v29'; // NEW VERSION with corrected RD reinvestment formula
>>>>>>> 6ad3211ffbe59b25959f439d7cccab2ec3957681
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
  // Add image paths for service worker cache
  './images/sml.jpeg',
  './images/vfl.jpeg',
  './images/snl.jpeg',
  './images/default.jpeg'
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

// --- UPDATED INVESTMENT DATA STRUCTURE ---
const investmentData = {
    "SML Finance Ltd": {
        "SD 5.5 Year": [
            { "monthly": "12.5%", "yearly": "13.0%", "period": "5.5 YEARS", "remarks": "5000 to less than 5 Lakhs", "generalRemark": "No Premature Closing Allowed", "type": "SD" },
            { "monthly": "13.0%", "yearly": "13.5%", "period": "5.5 YEARS", "remarks": "5 Lakhs to less than 25 Lakhs", "generalRemark": "No Premature Closing Allowed", "type": "SD" },
            { "monthly": "14.0%", "yearly": "14.5%", "period": "5.5 YEARS", "remarks": "25 Lakhs & above", "generalRemark": "No Premature Closing Allowed", "type": "SD" }
        ],
        "Doubling Scheme": [
            { "period": "6 YEARS", "remarks": "5000 & Above", "doublingRemark": "Doubles on maturity.", "generalRemark": "No Premature Closing Allowed", "type": "Doubling" }
        ],
        "Non-Convertible Debentures (NCD)": [
            {
                "monthly": "12.5%",
                "yearly": "Not Available",
                "period": "10 YEARS",
                "remarks": "2 Lakhs to less than 15 Lakhs",
                "closureRemark": "Closure allowed after 1 year.",
                "closureTerms": [
                    { "period": "Between 1 & 2 year", "cut": "1%" },
                    { "period": "Between 2 & 3 year", "cut": ".50%" },
                    { "period": "After 3 year", "cut": "No cut" },
                    { "period": "If closed after 3 years & between 2 Anniversary Years", "cut": "Effective Rate: 9%" }
                ],
                "type": "NCD"
            },
            {
                "monthly": "13%",
                "yearly": "Not Available",
                "period": "10 YEARS",
                "remarks": "15 Lakhs & above",
                "closureRemark": "Closure allowed after 1 year.",
                "closureTerms": [
                    { "period": "Between 1 & 2 year", "cut": "1%" },
                    { "period": "Between 2 & 3 year", "cut": ".50%" },
                    { "period": "After 3 year", "cut": "No cut" },
                    { "period": "If closed after 3 years & between 2 Anniversary Years", "cut": "Effective Rate: 9%" }
                ],
                "type": "NCD"
            }
        ]
    },
    "Vanchinad Finance (P) Ltd": {
        "SD 5.5 Year": [
            { "monthly": "12%", "yearly": "12.50%", "period": "5.5 YEARS", "remarks": "5000 to less than 5 Lakhs", "generalRemark": "No Premature Closing Allowed", "type": "SD" },
            { "monthly": "12.50%", "yearly": "13%", "period": "5.5 YEARS", "remarks": "5 Lakhs to less than 25 Lakhs", "generalRemark": "No Premature Closing Allowed", "type": "SD" },
            { "monthly": "13.50%", "yearly": "14%", "period": "5.5 YEARS", "remarks": "25 Lakhs & above", "generalRemark": "No Premature Closing Allowed", "type": "SD" }
        ],
        "Sub - ordinated Debt Doubling Scheme": [
            { "period": "6 YEARS", "remarks": "5000 & Above", "doublingRemark": "Doubles on maturity.", "generalRemark": "No Premature Closing Allowed", "type": "Doubling" }
        ],
        "Non-Convertible Debentures (NCD)": [
            {
                "monthly": "12.5%",
                "yearly": "13.0%",
                "period": "10 YEARS",
                "remarks": "5 Lakhs to less than 15 Lakhs",
                "closureRemark": "Closure allowed after 1 year.",
                "closureTerms": [
                    { "period": "Between 1 & 2 year", "cut": "2%" },
                    { "period": "Between 2 & 3 year", "cut": "1%" },
                    { "period": "After 3 year", "cut": "No cut" },
                    { "period": "If closed after 3 years & between 2 Anniversary Years", "cut": "Effective Rate: 9%" }
                ],
                "type": "NCD"
            },
            {
                "monthly": "13.0%",
                "yearly": "13.5%",
                "period": "10 YEARS",
                "remarks": "15 Laksh & above",
                "closureRemark": "Closure allowed after 1 year.",
                "closureTerms": [
                    { "period": "Between 1 & 2 year", "cut": "2%" },
                    { "period": "Between 2 & 3 year", "cut": "1%" },
                    { "period": "After 3 year", "cut": "No cut" },
                    { "period": "If closed after 3 years & between 2 Anniversary Years", "cut": "Effective Rate: 9%" }
                ],
                "type": "NCD"
            }
        ]
    },
    "SANGEETH NIDHI": {
        "Sangeeth Nidhi Deposits": [
            { "period": "6 MONTHS to Less than 1 Year", "yearly": "9%", "remarks": "5000 and above", "type": "SD" },
            { "period": "1 Year to 5 Years", "monthly": "12%", "yearly": "12.50%", "remarks": "5000 and above", "type": "SD" }
        ]
    },
    "RD Calculators": { // Renamed from "Special Calculators"
        "Recurring Deposit (RD)": [
            {
                "type": "RD", // Custom type to identify RD
                "fixedRate": 12.12,
                "minAmount": 1000, // Minimum monthly deposit for RD
                "period": "1 to 5 Years", // A general period description for display
                "displayRemarks": "Monthly Deposit (₹1000 or more)" // Custom remark for UI
            }
        ]
    }
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
const calculatorResultsDiv = document.getElementById('calculator-results');
const goToCalculatorLink = document.getElementById('go-to-calculator-link');

// New elements for period selection
const periodSelect = document.createElement('select');
periodSelect.id = 'period-select';
const periodGroup = document.createElement('div');
periodGroup.classList.add('control-group');
periodGroup.innerHTML = '<label for="period-select">Select Period (Years)</label>';
periodGroup.appendChild(periodSelect);

const rdReinvestmentCheckbox = document.createElement('input');
rdReinvestmentCheckbox.type = 'checkbox';
rdReinvestmentCheckbox.id = 'rd-reinvestment-checkbox';
const rdReinvestmentGroup = document.createElement('div');
rdReinvestmentGroup.classList.add('control-group', 'checkbox-group');
rdReinvestmentGroup.innerHTML = '<label for="rd-reinvestment-checkbox">Show RD Reinvestment</label>';
rdReinvestmentGroup.appendChild(rdReinvestmentCheckbox);


// Global state variables
let currentSelectedProductOptions = [];
let currentSelectedProductType = '';
let currentSelectedDetailForCalc = null;
let currentSelectedDetailIndex = -1;

let allowedMinAmount = 0;
let allowedMaxAmount = Infinity;
let specificAmountRequired = false;


// --- UI View Management Functions ---

function showAllOptionsView() {
    singleOptionCalculatorView.classList.add('hidden');
    allOptionsView.classList.remove('hidden');
    investmentAmountInput.value = '';
    calculatorResultsDiv.innerHTML = '<p class="placeholder-text">Enter an amount and select a product option above to calculate returns.</p>';
    resetAmountConstraints();
    // Remove the period selector
    if (periodGroup.parentNode) {
        periodGroup.parentNode.removeChild(periodGroup);
    }
    // Remove the RD reinvestment checkbox
    if (rdReinvestmentGroup.parentNode) {
        rdReinvestmentGroup.parentNode.removeChild(rdReinvestmentGroup);
    }
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

function populateCompanySelect() {
    const companies = Object.keys(investmentData);
    companySelect.innerHTML = '<option value="">-- Select a company --</option>';
    companies.forEach(company => {
        const option = document.createElement('option');
        option.value = company;
        option.textContent = company;
        companySelect.appendChild(option);
    });
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
    showAllOptionsView();

    if (!companyName || !productName || !investmentData[companyName] || !investmentData[companyName][productName]) {
        productOptionsGrid.innerHTML = '<p class="placeholder-text">Select a company and a product type to view available options.</p>';
        return;
    }

    const detailsArray = investmentData[companyName][productName];
    currentSelectedProductOptions = detailsArray;

    // Special handling for products that only have one option and need a calculator view
    if (detailsArray.length === 1 && (detailsArray[0].type === "RD" || (companyName === "SANGEETH NIDHI" && detailsArray[0].period.includes("6 MONTHS")))) {
        handleOptionSelection(0, null);
        return;
    }

    if (companyName === "Vanchinad Finance (P) Ltd" && productName === "Non-Convertible Debentures (NCD)") {
        productOptionsGrid.innerHTML = `
            <div class="no-ncd-message">
                <p><strong>Currently no NCD issue available. Kindly Opt SML NCD.</strong></p>
            </div>
        `;
        return;
    }

    detailsArray.forEach((detail, index) => {
        const card = document.createElement('div');
        card.classList.add('product-card');
        card.addEventListener('click', () => handleOptionSelection(index, card));

        const sanitizedCompanyName = companyName.replace(/[^a-zA-Z0-9]/g, '');
        const sanitizedProductName = productName.replace(/[^a-zA-Z0-9]/g, '');
        const radioGroupName = `${sanitizedCompanyName}-${sanitizedProductName}-option`;
        const radioId = `option-${sanitizedCompanyName}-${sanitizedProductName}-${index}`;

        let displayLabel = "For Amount:";
        let displayValue = detail.remarks || 'No specific remarks.';

        if (companyName === "SANGEETH NIDHI") {
            displayLabel = "For Period:";
            displayValue = detail.period || 'Not specified';
        } else {
            displayValue = displayValue.replace(/^(Between\s|between\s)/, '');
            displayValue = displayValue.replace(/\sbetween\s/ig, ' ');
            displayValue = displayValue.trim();
        }

        let cardContent = `
            <input type="radio" class="product-option-select" name="${radioGroupName}" id="${radioId}" value="${index}" ${currentSelectedDetailIndex === index ? 'checked' : ''}>
            <label for="${radioId}">
                <h4>Option ${index + 1}</h4>
                <p><strong>${displayLabel}</strong> ${displayValue}</p>
            </label>
        `;
        card.innerHTML = cardContent;
        productOptionsGrid.appendChild(card);

        if (currentSelectedDetailIndex === index) {
            card.classList.add('selected');
        }
    });
}

function handleOptionSelection(index, clickedCard) {
    if (clickedCard) {
        const previouslySelectedCard = document.querySelector('.product-card.selected');
        if (previouslySelectedCard) {
            previouslySelectedCard.classList.remove('selected');
        }
        clickedCard.classList.add('selected');
        const radioElement = clickedCard.querySelector('.product-option-select');
        if (radioElement) {
            radioElement.checked = true;
        }
    }

    currentSelectedDetailForCalc = currentSelectedProductOptions[index];
    currentSelectedDetailIndex = index;
    setAmountConstraints(currentSelectedDetailForCalc);
    displaySingleProductDetailsAndCalculator(companySelect.value, productSelect.value, currentSelectedDetailForCalc);
    calculateInvestmentReturns();
}

function displaySingleProductDetailsAndCalculator(companyName, productName, detail) {
    if (!detail) {
        selectedProductDetailCard.innerHTML = '<p class="placeholder-text">No option selected for detailed view.</p>';
        calculatorResultsDiv.innerHTML = '<p class="placeholder-text">Select an option to calculate returns.</p>';
        return;
    }

    selectedCompanyNameSingle.textContent = companyName;
    selectedProductNameSingle.textContent = productName;

    const isDoublingProduct = productName.toLowerCase().includes('doubling');
    const isNCDProduct = productName.toLowerCase().includes('ncd');
    const isRDProduct = detail.type === 'RD';
    const isSangeethNidhiProduct = companyName === "SANGEETH NIDHI";
    const isSDProduct = productName.toLowerCase().includes('sd');
    const hasMonthlyInterest = detail.monthly && detail.monthly.toLowerCase() !== 'not available' && detail.monthly.toLowerCase() !== 'n/a';

    let cardTitle = '';
    if (isRDProduct) {
        cardTitle = 'Recurring Deposit Details';
    } else if (isSangeethNidhiProduct) {
        cardTitle = 'Sangeeth Nidhi Deposit Details';
    } else {
        cardTitle = `Option ${currentSelectedDetailIndex + 1}`;
    }

    let cardContent = `<h4>${cardTitle}</h4>`;

    if (isRDProduct) {
        cardContent += `<p><strong>Product:</strong> ${detail.name || productName}</p>`;
        cardContent += `<p><strong>Interest Rate:</strong> 12%</p>`;
        cardContent += `<p><strong>Period:</strong> ${detail.period}</p>`;
        cardContent += `<p><strong>Minimum Monthly Deposit:</strong> ₹ ${detail.minAmount.toLocaleString('en-IN')}</p>`;
    } else {
        if (detail.remarks) {
            let remarkText = detail.remarks;
            remarkText = remarkText.replace(/^(Between\s|between\s)/, '');
            remarkText = remarkText.replace(/\sbetween\s/ig, ' ');
            remarkText = remarkText.trim();
            cardContent += `<p><strong>For Amount:</strong> ${remarkText}</p>`;
        }
        if (detail.period) {
            cardContent += `<p><strong>Period:</strong> ${detail.period}</p>`;
        }
    }

    if (isDoublingProduct) {
        cardContent += `<p><strong>Remarks:</strong> ${detail.doublingRemark}</p>`;
    } else if (isNCDProduct) {
        cardContent += `
            <p><strong>Monthly Interest:</strong> ${detail.monthly}</p>
            <p><strong>Yearly Interest:</strong> ${detail.yearly}</p>
            <h4>Premature Closure Terms:</h4>
            <table class="closure-table product-details-table"><thead>
                <tr><th>Closure Period</th><th>Interest Cut</th></tr>
            </thead><tbody>`;
        if (detail.closureTerms && detail.closureTerms.length > 0) {
            detail.closureTerms.forEach(term => {
                cardContent += `<tr><td>${term.period}</td><td>${term.cut}</td></tr>`;
            });
        } else {
            cardContent += `<tr><td colspan="2">No specific closure terms provided.</td></tr>`;
        }
        cardContent += `</tbody></table>`;
    } else if (!isRDProduct) {
        if (detail.monthly) {
            cardContent += `<p><strong>Monthly Interest:</strong> ${detail.monthly}</p>`;
        }
        if (detail.yearly) {
            cardContent += `<p><strong>Yearly Interest:</strong> ${detail.yearly}</p>`;
        }
    }

    if ((isDoublingProduct || isSDProduct) && detail.generalRemark) {
        cardContent += `<p class="general-remark"><strong>Important:</strong> ${detail.generalRemark}</p>`;
    }

    selectedProductDetailCard.innerHTML = cardContent;

    const calculatorControls = document.querySelector('.calculator-controls');
    
    // Manage period dropdown
    const isPeriodSelectNeeded = isNCDProduct || (isSangeethNidhiProduct && detail.period.includes("1 Year to 5 Years"));
    if (isPeriodSelectNeeded) {
        if (!periodGroup.parentNode) {
            investmentAmountInput.parentNode.parentNode.insertBefore(periodGroup, investmentAmountInput.parentNode.nextSibling);
        }
        periodSelect.innerHTML = '';
        let maxYears = isNCDProduct ? 10 : 5;
        for (let i = 1; i <= maxYears; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = `${i} Year${i > 1 ? 's' : ''}`;
            periodSelect.appendChild(option);
        }
        periodSelect.removeEventListener('change', calculateInvestmentReturns);
        periodSelect.addEventListener('change', calculateInvestmentReturns);
    } else if (periodGroup.parentNode) {
        periodGroup.parentNode.removeChild(periodGroup);
    }

    // Manage RD reinvestment checkbox
    if (hasMonthlyInterest) {
        if (!rdReinvestmentGroup.parentNode) {
            calculatorControls.appendChild(rdReinvestmentGroup);
        }
        rdReinvestmentCheckbox.removeEventListener('change', calculateInvestmentReturns);
        rdReinvestmentCheckbox.addEventListener('change', calculateInvestmentReturns);
    } else if (rdReinvestmentGroup.parentNode) {
        rdReinvestmentGroup.parentNode.removeChild(rdReinvestmentGroup);
    }

    showSingleOptionCalculatorView();
}


// --- Calculator Logic ---

function parsePercentage(value) {
    if (typeof value === 'string') {
        const num = parseFloat(value.replace('%', ''));
        return isNaN(num) ? null : num / 100;
    }
    return null;
}

function parseAmountRange(remarks) {
    let min = 0;
    let max = Infinity;
    let specific = null;

    if (!remarks) {
        return { min, max, specific };
    }

    const lowerCaseRemarks = remarks.toLowerCase();

    const aboveMatch = lowerCaseRemarks.match(/(\d+\s*lakhs|\d+)\s*&?\s*above/);
    if (aboveMatch) {
        min = parseAmountString(aboveMatch[1]);
    } else if (lowerCaseRemarks.includes('to less than')) {
        const match = lowerCaseRemarks.match(/(\d+\s*lakhs|\d+)\s*to less than\s*(\d+\s*lakhs|\d+)/);
        if (match) {
            min = parseAmountString(match[1]);
            max = parseAmountString(match[2]) - 1;
        }
    } else if (/\d+/.test(lowerCaseRemarks)) {
        const exactMatch = lowerCaseRemarks.match(/(\d+\s*lakhs|\d+)/);
        if (exactMatch) {
            specific = parseAmountString(exactMatch[0]);
            min = specific;
            max = specific;
        }
    }

    return { min, max, specific };
}

function parseAmountString(amountStr) {
    amountStr = amountStr.toLowerCase().replace(/\s/g, '');
    if (amountStr.includes('lakhs')) {
        return parseFloat(amountStr.replace('lakhs', '')) * 100000;
    }
    return parseFloat(amountStr);
}

function setAmountConstraints(detail) {
    const isRDProduct = detail && detail.type === "RD";
    const isSangeethNidhi = companySelect.value === "SANGEETH NIDHI";

    specificAmountRequired = false;
    investmentAmountInput.readOnly = false;
    investmentAmountInput.min = '';
    investmentAmountInput.max = '';

    if (isRDProduct) {
        investmentAmountInput.min = detail.minAmount.toString();
        allowedMinAmount = detail.minAmount;
        allowedMaxAmount = Infinity;
        investmentAmountInput.placeholder = `Enter monthly deposit (₹${detail.minAmount.toLocaleString('en-IN')} or more)`;
        return;
    }

    if (isSangeethNidhi) {
        investmentAmountInput.min = '5000';
        allowedMinAmount = 5000;
        allowedMaxAmount = Infinity;
        investmentAmountInput.placeholder = 'Enter ₹ 5,000 and above';
        return;
    }

    if (!detail || !detail.remarks) {
        resetAmountConstraints();
        return;
    }

    const { min, max, specific } = parseAmountRange(detail.remarks);

    allowedMinAmount = min;
    allowedMaxAmount = max;

    if (specific !== null) {
        specificAmountRequired = true;
        investmentAmountInput.value = specific;
        investmentAmountInput.readOnly = true;
        investmentAmountInput.min = specific;
        investmentAmountInput.max = specific;
    } else {
        specificAmountRequired = false;
        investmentAmountInput.readOnly = false;
        investmentAmountInput.min = min === 0 ? '' : min;
        investmentAmountInput.max = max === Infinity ? '' : max;
    }

    investmentAmountInput.placeholder = getPlaceholderText(min, max, specific);
}

function getPlaceholderText(min, max, specific) {
    if (specific !== null) {
        return `Enter ₹ ${specific.toLocaleString('en-IN')}`;
    }
    if (min > 0 && max !== Infinity) {
        return `Enter between ₹ ${min.toLocaleString('en-IN')} and ₹ ${max.toLocaleString('en-IN')}`;
    }
    if (min > 0) {
        return `Enter ₹ ${min.toLocaleString('en-IN')} and above`;
    }
    return 'e.g., 10000';
}

function resetAmountConstraints() {
    allowedMinAmount = 0;
    allowedMaxAmount = Infinity;
    specificAmountRequired = false;
    investmentAmountInput.readOnly = false;
    investmentAmountInput.min = '';
    investmentAmountInput.max = '';
    investmentAmountInput.placeholder = 'e.g., 10000';
    investmentAmountInput.classList.remove('invalid-input');
}

function calculateInvestmentReturns() {
    const amount = parseFloat(investmentAmountInput.value);
    calculatorResultsDiv.innerHTML = '';

    if (isNaN(amount) || amount <= 0) {
        calculatorResultsDiv.innerHTML = '<p class="placeholder-text">Enter a valid positive amount.</p>';
        investmentAmountInput.classList.add('invalid-input');
        return;
    }

    if (!currentSelectedDetailForCalc || !currentSelectedProductType) {
        calculatorResultsDiv.innerHTML = '<p class="placeholder-text">Please select a product option above to calculate returns.</p>';
        investmentAmountInput.classList.remove('invalid-input');
        return;
    }

    const detail = currentSelectedDetailForCalc;
    const productName = currentSelectedProductType;
    const companyName = companySelect.value;
    
    // --- RD Calculator Logic ---
    if (detail.type === 'RD') {
        if (isNaN(amount) || amount < detail.minAmount) {
            calculatorResultsDiv.innerHTML = `<p class="error-message">Please enter a monthly deposit amount (₹${detail.minAmount.toLocaleString('en-IN')} or more) to see maturity details.</p>`;
            investmentAmountInput.classList.add('invalid-input');
            return;
        }

        const annualRatePercentage = detail.fixedRate;
        let tableHTML = `<div class="maturity-table-container">
            <table class="maturity-table">
                <thead>
                    <tr>
                        <th>Period (Years)</th>
                        <th>Maturity Amount</th>
                    </tr>
                </thead>
                <tbody>`;

        for (let years = 1; years <= 5; years++) {
            const r = annualRatePercentage / 400;
            const n_quarters = (years * 12) / 3;

            const numerator = Math.pow((1 + r), n_quarters) - 1;
            const denominator = 1 - Math.pow((1 + r), -1/3);

            let maturityAmount = 0;
            if (denominator !== 0) {
                maturityAmount = amount * (numerator / denominator);
            }

            const roundedMaturity = Math.round(maturityAmount);

            tableHTML += `
                <tr>
                    <td>${years} Year${years > 1 ? 's' : ''}</td>
                    <td>₹ ${roundedMaturity.toLocaleString('en-IN')}</td>
                </tr>
            `;
        }

        tableHTML += `</tbody></table></div>`;
        calculatorResultsDiv.innerHTML = tableHTML;
        investmentAmountInput.classList.remove('invalid-input');
        return;
    }

    // --- Existing Amount Validation for other products ---
    if (companyName === "SANGEETH NIDHI") {
        if (amount < 5000) {
            calculatorResultsDiv.innerHTML = `<p class="error-message">Please enter an amount of ₹ 5,000 or more for Sangeeth Nidhi.</p>`;
            investmentAmountInput.classList.add('invalid-input');
            return;
        }
    } else if (specificAmountRequired && amount !== allowedMinAmount) {
        calculatorResultsDiv.innerHTML = `<p class="error-message">Please enter the specific amount: ₹ ${allowedMinAmount.toLocaleString('en-IN')}</p>`;
        investmentAmountInput.classList.add('invalid-input');
        return;
    } else if (!specificAmountRequired && (amount < allowedMinAmount || amount > allowedMaxAmount)) {
        let errorMessage = `<p class="error-message">Please enter an amount `;
        if (allowedMinAmount > 0 && allowedMaxAmount !== Infinity) {
            errorMessage += `between ₹ ${allowedMinAmount.toLocaleString('en-IN')} and ₹ ${allowedMaxAmount.toLocaleString('en-IN')}.`;
        } else if (allowedMinAmount > 0) {
            errorMessage += `of ₹ ${allowedMinAmount.toLocaleString('en-IN')} or more.`;
        }
        errorMessage += `</p>`;
        calculatorResultsDiv.innerHTML = errorMessage;
        investmentAmountInput.classList.add('invalid-input');
        return;
    }

    investmentAmountInput.classList.remove('invalid-input');

    // --- Calculation Logic for SD, Doubling, NCD with new table output ---
    const isDoublingProduct = productName.toLowerCase().includes('doubling');
    const isNCDProduct = productName.toLowerCase().includes('ncd');
    const isSangeethNidhiProduct = companyName === "SANGEETH NIDHI";
    const isSDProduct = productName.toLowerCase().includes('sd');
    const hasMonthlyInterest = detail.monthly && detail.monthly.toLowerCase() !== 'not available';
    const showRdReinvestment = rdReinvestmentCheckbox.checked && hasMonthlyInterest;
    
    let resultsHTML = '';

    if (companyName === "Vanchinad Finance (P) Ltd" && productName === "Non-Convertible Debentures (NCD)") {
        calculatorResultsDiv.innerHTML = `
            <div class="no-ncd-message">
                <p><strong>Currently no NCD Issue Available for calculation. Kindly Opt SML NCD.</strong></p>
            </div>
        `;
        return;
    }

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
    } else {
        let selectedYears = 0;
        let periodDisplay = '';
        let totalMonths = 0;

        if (isNCDProduct || (isSangeethNidhiProduct && detail.period.includes("1 Year to 5 Years"))) {
            selectedYears = parseInt(periodSelect.value);
            periodDisplay = `${selectedYears} Year${selectedYears > 1 ? 's' : ''}`;
            totalMonths = selectedYears * 12;
        } else if (isSDProduct) {
             const periodMatch = detail.period.match(/(\d+\.?\d*)\s*YEARS?/i);
             selectedYears = periodMatch ? parseFloat(periodMatch[1]) : 0;
             periodDisplay = detail.period;
             totalMonths = selectedYears * 12;
        } else if (isSangeethNidhiProduct && detail.period.includes("6 MONTHS")) {
            selectedYears = 1; 
            periodDisplay = detail.period;
            totalMonths = 12;
        }

        const monthlyRate = parsePercentage(detail.monthly);
        const yearlyRate = parsePercentage(detail.yearly);

        const monthlyInterest = (monthlyRate !== null) ? (amount * monthlyRate / 12) : null;
        const annualInterest = (yearlyRate !== null) ? (amount * yearlyRate) : null;

        // Calculate maturity for monthly and annual payout
        const monthlyMaturity = (monthlyInterest !== null && totalMonths > 0) ? amount + (monthlyInterest * totalMonths) : null;
        const annualMaturity = (annualInterest !== null && selectedYears > 0) ? amount + (annualInterest * selectedYears) : null;

        resultsHTML += `
            <div class="calculator-area">
                <h4>Investment Calculation</h4>
                <div class="calculator-results-grid">
                    <div class="calculator-result-card">
                        <h4>Investment Amount</h4>
                        <p>₹ ${amount.toLocaleString('en-IN')}</p>
                    </div>
                    <div class="calculator-result-card">
                        <h4>Period</h4>
                        <p>${periodDisplay}</p>
                    </div>
                    <div class="calculator-result-card">
                        <h4>Monthly Interest</h4>
                        <p>${monthlyInterest ? `₹ ${monthlyInterest.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : 'N/A'}</p>
                    </div>
                    <div class="calculator-result-card">
                        <h4>Yearly Interest</h4>
                        <p>${annualInterest ? `₹ ${annualInterest.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : 'N/A'}</p>
                    </div>
                    <div class="calculator-result-card highlight">
                        <h4>Total Maturity (Monthly Payout)</h4>
                        <p>${monthlyMaturity ? `₹ ${Math.round(monthlyMaturity).toLocaleString('en-IN')}` : 'N/A'}</p>
                    </div>
                    <div class="calculator-result-card highlight">
                        <h4>Total Maturity (Annual Payout)</h4>
                        <p>${annualMaturity ? `₹ ${Math.round(annualMaturity).toLocaleString('en-IN')}` : 'N/A'}</p>
                    </div>
        `;
        
        // Add RD reinvestment calculation if applicable
        if (showRdReinvestment) {
             let rdMaturityContent = '';
<<<<<<< HEAD
             let extraAmountContent = '';
            
            if (monthlyInterest === null || monthlyInterest < 1000) {
                 rdMaturityContent = '<p class="error-message">RD reinvestment 1000 or more</p>';
                 extraAmountContent = '<p class="error-message">RD reinvestment 1000 or more</p>';
=======
            
            if (monthlyInterest === null || monthlyInterest < 1000) {
                 rdMaturityContent = '<p class="error-message">RD reinvestment 1000 or more</p>';
>>>>>>> 6ad3211ffbe59b25959f439d7cccab2ec3957681
            } else {
                const rdAnnualRate = 12.12;
                const r = rdAnnualRate / 400; // Rate per quarter
                
                let rdReinvestmentMonths = Math.min(totalMonths, 60);
                const n_quarters = rdReinvestmentMonths / 3;
                
                // RD maturity formula: M = P * [ (1+i)^n - 1 ] / [ 1 - (1+i)^(-1/3) ]
                const P = monthlyInterest;
                const i = r;
                const n = n_quarters;

                const numerator = Math.pow(1 + i, n) - 1;
                const denominator = 1 - Math.pow(1 + i, -1/3);
                
                let rdMaturityAmount = 0;
                if (denominator !== 0) {
                    rdMaturityAmount = P * (numerator / denominator);
                }

<<<<<<< HEAD
                let totalReinvestmentMaturity;
                let extraAmountFromRd;

                if (isSDProduct && selectedYears === 5.5) {
                    const remainingMonths = totalMonths - rdReinvestmentMonths;
                    const remainingInterest = monthlyInterest * remainingMonths;
                    
                    // Total maturity for RD Reinvestment is the principal + compounded interest (RD) + simple interest for remaining months
                    totalReinvestmentMaturity = amount + rdMaturityAmount + remainingInterest;

                    // Extra Amount is the total value of the 60-month RD (principal + compounded interest) minus the total maturity
                    // of the simple payout scheme (principal + 66 months of simple interest).
                    // This directly implements the user's correct calculation logic.
                    extraAmountFromRd = (amount + rdMaturityAmount) - monthlyMaturity;

                } else {
                    totalReinvestmentMaturity = amount + rdMaturityAmount;
                    extraAmountFromRd = totalReinvestmentMaturity - monthlyMaturity;
                }

                rdMaturityContent = `<p>₹ ${Math.round(totalReinvestmentMaturity).toLocaleString('en-IN')}</p>`;
                extraAmountContent = `<p>₹ ${Math.round(extraAmountFromRd).toLocaleString('en-IN')}</p>`;
=======
                // Special handling for SD 5.5 Year (66 months)
                if (isSDProduct && selectedYears === 5.5) {
                    const remainingMonths = totalMonths - rdReinvestmentMonths;
                    const remainingInterest = monthlyInterest * remainingMonths;
                    rdMaturityAmount += remainingInterest;
                }

                const totalReinvestmentMaturity = amount + rdMaturityAmount;

                rdMaturityContent = `<p>₹ ${Math.round(totalReinvestmentMaturity).toLocaleString('en-IN')}</p>`;
>>>>>>> 6ad3211ffbe59b25959f439d7cccab2ec3957681
            }

            resultsHTML += `
                <div class="calculator-result-card highlight">
                    <h4>Total Maturity (RD Reinvestment)</h4>
                    ${rdMaturityContent}
                </div>
<<<<<<< HEAD
                <div class="calculator-result-card highlight">
                    <h4>Extra Amount from RD Reinvestment</h4>
                    ${extraAmountContent}
                </div>
=======
>>>>>>> 6ad3211ffbe59b25959f439d7cccab2ec3957681
            `;
        }

        resultsHTML += `</div></div>`;
        resultsHTML += detail.generalRemark ? `<p class="general-remark"><strong>Important:</strong> ${detail.generalRemark}</p>` : '';
    }

    calculatorResultsDiv.innerHTML = resultsHTML;
}

// Event Listeners
companySelect.addEventListener('change', (event) => {
    const selectedCompany = event.target.value;
    populateProductSelect(selectedCompany);
});

productSelect.addEventListener('change', (event) => {
    const selectedProduct = event.target.value;
    const selectedCompany = companySelect.value;
    displayProductOptions(selectedCompany, selectedProduct);
});

investmentAmountInput.addEventListener('input', calculateInvestmentReturns);

periodSelect.addEventListener('change', calculateInvestmentReturns);

changeOptionButton.addEventListener('click', () => {
    showAllOptionsView();
});

goToCalculatorLink.addEventListener('click', function (e) {
    e.preventDefault();
    if (!singleOptionCalculatorView.classList.contains('hidden')) {
        singleOptionCalculatorView.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    } else {
        alert('Please select a product option first to go to the calculator!');
    }
});


// Initial state
populateCompanySelect();
<<<<<<< HEAD
showAllOptionsView();
=======
showAllOptionsView();
>>>>>>> 6ad3211ffbe59b25959f439d7cccab2ec3957681
