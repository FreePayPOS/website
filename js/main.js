// FreePay POS Website JavaScript

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileNavigation();
    initSmoothScrolling();
    loadWalletCompatibility();
    initContactForm();
});

// Mobile Navigation Toggle
function initMobileNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            const isExpanded = navMenu.classList.contains('active');
            navMenu.classList.toggle('active');
            
            // Update ARIA attributes for accessibility
            navToggle.setAttribute('aria-expanded', !isExpanded);
            
            // Animate hamburger menu
            navToggle.classList.toggle('active');
        });

        // Close menu when clicking on nav links
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Wallet Compatibility Data Loading and Management
let walletsData = [];
let filteredWallets = [];

async function loadWalletCompatibility() {
    try {
        const response = await fetch('data/wallets.json');
        const data = await response.json();
        walletsData = data.wallets;
        filteredWallets = [...walletsData];
        
        renderWalletTable();
        initTableControls();
        
    } catch (error) {
        console.error('Error loading wallet data:', error);
        showWalletError();
    }
}

function renderWalletTable() {
    const tableBody = document.getElementById('wallet-table-body');
    
    if (!tableBody) return;
    
    if (filteredWallets.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="4" style="text-align: center; padding: 2rem; color: #6b7280;">
                    No wallets found matching your criteria.
                </td>
            </tr>
        `;
        return;
    }
    
    tableBody.innerHTML = filteredWallets.map(wallet => `
        <tr>
            <td data-label="Wallet">
                <strong>${wallet.name}</strong>
            </td>
            <td data-label="Status">
                <div class="status-badge ${wallet.status}">
                    <span class="status-indicator ${wallet.status}"></span>
                    ${getStatusText(wallet.status)}
                </div>
            </td>
            <td data-label="Description">
                ${wallet.description}
                ${wallet.issues && wallet.issues.length > 0 ? 
                    `<br><small style="color: #6b7280;">Issues: ${wallet.issues.join(', ')}</small>` : 
                    ''
                }
            </td>
            <td data-label="Last Tested">${wallet.lastTested}</td>
        </tr>
    `).join('');
    
    // Update results count
    updateResultsCount();
}

function getStatusText(status) {
    const statusMap = {
        'compatible': 'Compatible',
        'native': 'Native Support',
        'issues': 'Has Issues',
        'incompatible': 'Incompatible'
    };
    return statusMap[status] || status;
}

function initTableControls() {
    const searchInput = document.getElementById('wallet-search');
    const statusFilter = document.getElementById('status-filter');
    
    if (searchInput) {
        // Debounce search input for better performance
        let searchTimeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                filterWallets();
                announceResults();
            }, 300);
        });
    }
    
    if (statusFilter) {
        statusFilter.addEventListener('change', function() {
            filterWallets();
            announceResults();
        });
    }
    
    // Initialize table sorting
    initTableSorting();
    
    // Add export functionality
    addExportButton();
}

// Announce search results for screen readers
function announceResults() {
    const existingAnnouncement = document.getElementById('search-announcement');
    if (existingAnnouncement) {
        existingAnnouncement.remove();
    }
    
    const announcement = document.createElement('div');
    announcement.id = 'search-announcement';
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = `Search results updated. Showing ${filteredWallets.length} of ${walletsData.length} wallets.`;
    
    document.body.appendChild(announcement);
    
    // Remove after announcement
    setTimeout(() => {
        if (announcement.parentNode) {
            announcement.parentNode.removeChild(announcement);
        }
    }, 1000);
}

// Table sorting functionality
let sortColumn = '';
let sortDirection = 'asc';

function initTableSorting() {
    const headers = document.querySelectorAll('#compatibility-table th');
    
    headers.forEach((header, index) => {
        header.style.cursor = 'pointer';
        header.title = 'Click to sort';
        
        // Add sort indicators
        const sortIndicator = document.createElement('span');
        sortIndicator.className = 'sort-indicator';
        sortIndicator.innerHTML = ' ↕️';
        header.appendChild(sortIndicator);
        
        header.addEventListener('click', function() {
            const columnName = ['name', 'status', 'description', 'lastTested'][index];
            sortTable(columnName);
        });
    });
}

function sortTable(column) {
    if (sortColumn === column) {
        sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        sortColumn = column;
        sortDirection = 'asc';
    }
    
    filteredWallets.sort((a, b) => {
        let aVal = a[column];
        let bVal = b[column];
        
        // Special handling for status column
        if (column === 'status') {
            const statusOrder = { 'compatible': 1, 'issues': 2, 'incompatible': 3, 'native': 0 };
            aVal = statusOrder[aVal] || 999;
            bVal = statusOrder[bVal] || 999;
        }
        
        // String comparison for other columns
        if (typeof aVal === 'string') {
            aVal = aVal.toLowerCase();
            bVal = bVal.toLowerCase();
        }
        
        if (sortDirection === 'asc') {
            return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
        } else {
            return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
        }
    });
    
    renderWalletTable();
    updateSortIndicators();
}

function updateSortIndicators() {
    const headers = document.querySelectorAll('#compatibility-table th');
    const columns = ['name', 'status', 'description', 'lastTested'];
    
    headers.forEach((header, index) => {
        const indicator = header.querySelector('.sort-indicator');
        if (columns[index] === sortColumn) {
            indicator.innerHTML = sortDirection === 'asc' ? ' ↑' : ' ↓';
            header.style.backgroundColor = '#e5e7eb';
            
            // Update ARIA attributes for accessibility
            header.setAttribute('aria-sort', sortDirection === 'asc' ? 'ascending' : 'descending');
        } else {
            indicator.innerHTML = ' ↕️';
            header.style.backgroundColor = '#f3f4f6';
            header.setAttribute('aria-sort', 'none');
        }
    });
}

function updateResultsCount() {
    const existingCount = document.querySelector('.results-count');
    if (existingCount) {
        existingCount.remove();
    }
    
    const tableControls = document.querySelector('.table-controls');
    const resultsCount = document.createElement('div');
    resultsCount.className = 'results-count';
    resultsCount.style.cssText = `
        text-align: center;
        color: #6b7280;
        font-size: 0.875rem;
        margin-top: 0.5rem;
    `;
    resultsCount.textContent = `Showing ${filteredWallets.length} of ${walletsData.length} wallets`;
    
    tableControls.appendChild(resultsCount);
}

function addExportButton() {
    const tableControls = document.querySelector('.table-controls');
    const exportBtn = document.createElement('button');
    exportBtn.className = 'btn btn-outline export-btn';
    exportBtn.textContent = 'Export CSV';
    exportBtn.style.marginLeft = '1rem';
    
    exportBtn.addEventListener('click', exportTableToCSV);
    tableControls.appendChild(exportBtn);
}

function exportTableToCSV() {
    const headers = ['Wallet', 'Status', 'Description', 'Last Tested'];
    const csvContent = [
        headers.join(','),
        ...filteredWallets.map(wallet => [
            `"${wallet.name}"`,
            `"${getStatusText(wallet.status)}"`,
            `"${wallet.description.replace(/"/g, '""')}"`,
            `"${wallet.lastTested}"`
        ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'freepay-wallet-compatibility.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showNotification('Wallet compatibility data exported successfully!', 'success');
    } else {
        showNotification('Export not supported in this browser', 'error');
    }
}

function filterWallets() {
    const searchTerm = document.getElementById('wallet-search')?.value.toLowerCase() || '';
    const statusFilter = document.getElementById('status-filter')?.value || '';
    
    filteredWallets = walletsData.filter(wallet => {
        const matchesSearch = wallet.name.toLowerCase().includes(searchTerm) ||
                            wallet.description.toLowerCase().includes(searchTerm);
        
        const matchesStatus = !statusFilter || wallet.status === statusFilter;
        
        return matchesSearch && matchesStatus;
    });
    
    renderWalletTable();
}

function showWalletError() {
    const tableBody = document.getElementById('wallet-table-body');
    if (tableBody) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="4" style="text-align: center; padding: 2rem; color: #dc2626;">
                    Error loading wallet compatibility data. Please try refreshing the page.
                </td>
            </tr>
        `;
    }
}

// Contact Form Handling
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactSubmission();
        });
    }
}

function handleContactSubmission() {
    // Get form data
    const formData = {
        name: document.getElementById('name')?.value,
        email: document.getElementById('email')?.value,
        subject: document.getElementById('subject')?.value,
        message: document.getElementById('message')?.value
    };
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    if (!isValidEmail(formData.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Simulate form submission (replace with actual form handling)
    showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
    
    // Reset form
    document.getElementById('contact-form').reset();
    
    // In a real implementation, you would send this data to your server
    console.log('Form submission:', formData);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        color: white;
        font-weight: 500;
        z-index: 10000;
        max-width: 400px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    // Set background color based on type
    const colors = {
        success: '#22c55e',
        error: '#dc2626',
        info: '#2563eb',
        warning: '#eab308'
    };
    notification.style.backgroundColor = colors[type] || colors.info;
    
    notification.textContent = message;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Scroll-based Navigation Highlighting
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Initialize scroll spy after DOM is loaded
document.addEventListener('DOMContentLoaded', initScrollSpy);

// Performance and User Experience Enhancements
function initPerformanceOptimizations() {
    // Lazy load images when they come into view
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Preload critical resources
    const criticalLinks = document.querySelectorAll('link[rel="preload"]');
    criticalLinks.forEach(link => {
        if (link.href) {
            fetch(link.href).catch(() => {
                // Silently handle preload failures
            });
        }
    });
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', initPerformanceOptimizations);

// Error Handling and Fallbacks
window.addEventListener('error', function(event) {
    console.error('JavaScript error:', event.error);
    // In production, you might want to send this to an error tracking service
});

// Performance monitoring
function initPerformanceMonitoring() {
    // Core Web Vitals monitoring
    if ('PerformanceObserver' in window) {
        // Largest Contentful Paint
        new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
                console.log('LCP:', entry.startTime);
            }
        }).observe({entryTypes: ['largest-contentful-paint']});

        // First Input Delay
        new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
                console.log('FID:', entry.processingStart - entry.startTime);
            }
        }).observe({entryTypes: ['first-input']});

        // Cumulative Layout Shift
        new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
                if (!entry.hadRecentInput) {
                    console.log('CLS:', entry.value);
                }
            }
        }).observe({entryTypes: ['layout-shift']});
    }

    // Page load timing
    window.addEventListener('load', function() {
        const perfData = performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page Load Time:', pageLoadTime + 'ms');
    });
}

// Critical resource hints
function addResourceHints() {
    // Preload critical resources
    const criticalResources = [
        'data/wallets.json'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = resource.endsWith('.json') ? 'fetch' : 'script';
        if (resource.endsWith('.json')) link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
    });
}

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Initialize performance monitoring
        initPerformanceMonitoring();
        
        // Add resource hints for better performance
        addResourceHints();
        
        // Register service worker when available
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
} 