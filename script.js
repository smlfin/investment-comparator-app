// Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js') // Use /sw.js for root scope
      .then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  });
}

// --- REST OF YOUR EXISTING SCRIPT.JS CODE FOLLOWS BELOW ---
// const investmentData = { ... };
// const companySelect = document.getElementById('company-select');
// ... etc.
const investmentData = {
    "SML Finance Ltd": {
        "SD 5.5 Year": [
            { "monthly": "12.5%", "yearly": "13.0%", "period": "5.5 YEARS", "remarks": "5000 & 5 LAKHS", "generalRemark": "No Premature Closing Allowed" },
            { "monthly": "13.0%", "yearly": "13.5%", "period": "5.5 YEARS", "remarks": "5 LAKHS & 25 LAKHS", "generalRemark": "No Premature Closing Allowed" },
            { "monthly": "14.0%", "yearly": "14.5%", "period": "5.5 YEARS", "remarks": "25 LAKHS & ABOVE", "generalRemark": "No Premature Closing Allowed" }
        ],
        "Doubling Scheme": [
            { "period": "6 YEARS", "remarks": "5000 & Above", "doublingRemark": "Doubles on maturity.", "generalRemark": "No Premature Closing Allowed" }
        ],
        "Non-Convertible Debentures (NCD)": [
            { "monthly": "12.5%", "yearly": "MONTHLY", "period": "10 YEARS", "remarks": "1 Lakh and Above", "closureRemark": "Closure allowed after 1 year." }
        ]
    },
    "Vanchinad Finance (P) Ltd": {
        "SD 5.5 Year": [
            { "monthly": "12.5%", "yearly": "13.0%", "period": "5.5 YEARS", "remarks": "5000 & 5 LAKHS", "generalRemark": "No Premature Closing Allowed" },
            { "monthly": "13.0%", "yearly": "13.5%", "period": "5.5 YEARS", "remarks": "5 LAKHS & 25 LAKHS", "generalRemark": "No Premature Closing Allowed" },
            { "monthly": "14.0%", "yearly": "14.5%", "period": "5.5 YEARS", "remarks": "25 LAKHS & ABOVE", "generalRemark": "No Premature Closing Allowed" }
        ],
        "Sub - ordinated Debt Doubling Scheme": [
            { "period": "6 YEARS", "remarks": "5000 & Above", "doublingRemark": "Doubles on maturity.", "generalRemark": "No Premature Closing Allowed" }
        ],
        "Non-Convertible Debentures (NCD)": [
            { "monthly": "12.5%", "yearly": "13.0%", "period": "10 YEARS", "remarks": "5 LAKHS & 15 LAKH", "closureRemark": "Closure allowed after 1 year." },
            { "monthly": "13.0%", "yearly": "13.5%", "period": "10 YEARS", "remarks": "ABOVE 15 LAKH", "closureRemark": "Closure allowed after 1 year." }
        ]
    },
    "SANGEETH NIDHI": {
        "Sangeeth Nidhi Deposits": [
            { "period": "6 MONTHS < 1 YEAR", "yearly": "9%", "remarks": "5000 and above" },
            { "period": "1 YEAR < 5 YEAR", "monthly": "12%", "yearly": "12.50%", "remarks": "5000 and above" }
        ]
    }
};

const companySelect = document.getElementById('company-select');
const productSelect = document.getElementById('product-select');
const selectedCompanyName = document.getElementById('selected-company-name');
const selectedProductName = document.getElementById('selected-product-name');
const productDetailsDiv = document.getElementById('product-details');

function populateProductSelect(companyName) {
    productSelect.innerHTML = '<option value="">-- Select a product --</option>';
    productSelect.disabled = true;
    selectedProductName.textContent = '';
    productDetailsDiv.innerHTML = '<p class="placeholder-text">Select a company and a product to view details.</p>';


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

function displayProductDetails(companyName, productName) {
    productDetailsDiv.innerHTML = '';
    selectedCompanyName.textContent = companyName ? companyName : '';
    selectedProductName.textContent = productName ? productName : '';

    if (companyName && productName && investmentData[companyName] && investmentData[companyName][productName]) {
        const detailsArray = investmentData[companyName][productName];
        const isDoublingProduct = productName.toLowerCase().includes('doubling');
        const isNCDProduct = productName.toLowerCase().includes('ncd');
        const isSangeethNidhiProduct = companyName === "SANGEETH NIDHI";

        detailsArray.forEach((detail, index) => {
            const card = document.createElement('div');
            card.classList.add('product-card');

            let cardContent = `<h4>Option ${index + 1}</h4>`;

            // "For Amount Between" at the top
            if (detail.remarks) {
                cardContent += `<p><strong>For Amount Between:</strong> ${detail.remarks}</p>`;
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
                    <table class="closure-table">
                        <thead>
                            <tr>
                                <th>Closure Period</th>
                                <th>Interest Cut</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>If closed after 1 Year</td>
                                <td>2% Interest Cut</td>
                            </tr>
                            <tr>
                                <td>If closed after 2 Year</td>
                                <td>1% Interest Cut</td>
                            </tr>
                            <tr>
                                <td>Eligible for full interest after 3 years</td>
                                <td>No Interest Cut</td>
                            </tr>
                        </tbody>
                    </table>
                `;
            }
            // Default display for other products (like SD and Sangeeth Nidhi Deposits)
            else {
                if (detail.monthly) { // Only show if monthly interest exists
                    cardContent += `<p><strong>Monthly Interest:</strong> ${detail.monthly}</p>`;
                }
                if (detail.yearly) { // Only show if yearly interest exists
                    cardContent += `<p><strong>Yearly Interest:</strong> ${detail.yearly}</p>`;
                }
            }

            // Add "No Premature Closing Allowed" for SD and Doubling products
            if ((isDoublingProduct || productName.toLowerCase().includes('sd')) && detail.generalRemark) {
                cardContent += `<p class="general-remark"><strong>Important:</strong> ${detail.generalRemark}</p>`;
            }


            card.innerHTML = cardContent;
            productDetailsDiv.appendChild(card);
        });
    } else {
        productDetailsDiv.innerHTML = '<p class="placeholder-text">Select a company and a product to view details.</p>';
    }
}

// Event Listeners
companySelect.addEventListener('change', (event) => {
    const selectedCompany = event.target.value;
    populateProductSelect(selectedCompany);
    displayProductDetails(selectedCompany, ''); // Clear product details when company changes
});

productSelect.addEventListener('change', (event) => {
    const selectedProduct = event.target.value;
    const selectedCompany = companySelect.value;
    displayProductDetails(selectedCompany, selectedProduct);
});

// Initial state
populateProductSelect(''); // Initialize product select as disabled