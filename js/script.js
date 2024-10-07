const navToggle = document.querySelector('.mobile-nav-toggle');
const iconClose = document.querySelector('.close-icon');
const iconMenu = document.querySelector('.menu-icon');
const primaryNav = document.querySelector('.primary-navigation');
const primaryHeader = document.querySelector('.primary-header');

navToggle.addEventListener('click', ()=> {
    primaryNav.hasAttribute("data-visible")
    ? navToggle.setAttribute("aria-expanded", false)
    : navToggle.setAttribute("aria-expanded", true);

    hideMobileMenu();  

    // Get the value of the aria-expanded attribute
    const isExpanded = navToggle.getAttribute("aria-expanded");

    if(isExpanded === "true") {
        primaryNav.classList.add('primary-mobile-navigation');
    } else {
        primaryNav.classList.remove('primary-mobile-navigation');
    }
});

function hideMobileMenu () {
    primaryNav.toggleAttribute('data-visible');
    primaryHeader.toggleAttribute('data-overlay');
    iconClose.toggleAttribute('icon-visible');
    iconMenu.toggleAttribute('icon-hidden');
}
// Function to smoothly scroll to a target element
function scrollToElement(targetElement) {  

window.scrollTo({
    top: targetElement.offsetTop,
    behavior: 'smooth'
});
}

const priceButton = document.querySelector('#priceButton');

priceButton.addEventListener('click', function () {
    const targetId = 'priser';
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        scrollToElement(targetElement);
      }
});

const srcElements = document.querySelectorAll('.btnCta');

srcElements.forEach((element) => {  
  element.addEventListener('click', (event) => {
    
    event.preventDefault(); // Prevent the default behavior of anchor tags                
    
    let targetId;

    if (element.nodeName === 'A') {     
      var computedStyle = window.getComputedStyle(navToggle);

      var displayValue = computedStyle.getPropertyValue('display');

      if(displayValue === 'block') {
        hideMobileMenu();
      }
       
      // Get the target ID from the href attribute
      targetId = element.getAttribute('href').slice(1);
    } else {
      targetId = 'kontakt';
    }

    // Select the target element using its ID
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      scrollToElement(targetElement);
    }
  });
});


// Slider
const slider = new A11YSlider(document.querySelector('.slider'), {
  adaptiveHeight: false,
  dots: false,
  slidesToShow: 1,
  responsive: {
    800: {
      slidesToShow: 2,
      arrows: true
    }
  }  
  // arrows: false,
  
});

window.addEventListener('scroll', function() {
  const header = document.querySelector('header');
  const menuButton = document.querySelector('[data-type="menu-cta"]');
  const logo = document.querySelector('.logo_text');
  const logo_icon = this.document.querySelector('.logo_icon');

  if (window.scrollY > 50) {
    header.classList.add('sticking');
    menuButton.classList.add('menu-cta');
    logo.classList.add('logo-sticking');
    logo_icon.classList.add('logo-icon-sticking');
  } else {
    header.classList.remove('sticking');
    menuButton.classList.remove('menu-cta');
    logo.classList.remove('logo-sticking');
    logo_icon.classList.remove('logo-icon-sticking');
  }
});


document.querySelector('#frmContact').addEventListener('submit', function (e) {
    e.preventDefault();
    var form = document.getElementById("frmContact");
    var formData = new FormData(form);

    postData(formData);
});

async function postData(formattedFormData)
{
    const response = await fetch('../send_email.php',{        
        method: 'POST',
        body: formattedFormData
    });

    const data = await response.text();

    console.log(data);
}