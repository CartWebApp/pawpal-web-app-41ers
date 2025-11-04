// Make the "Type here..." <p> elements editable and behave like inputs
document.querySelectorAll('.Type1, .Type2, .Type3, .Type4, .Type5, .Type6, .Type7').forEach(field => {
    field.setAttribute('contenteditable', 'true');
    field.addEventListener('focus', () => {
        if (field.innerText.trim() === 'Type here...' || field.innerText.trim() === 'MM' || field.innerText.trim() === 'YY') {
            field.innerText = '';
        }
    });
    field.addEventListener('blur', () => {
        if (field.innerText.trim() === '') {
            if (field.classList.contains('Type6')) field.innerText = 'MM';
            else if (field.classList.contains('Type7')) field.innerText = 'YY';
            else field.innerText = 'Type here...';
        }
    });
});

// Validation logic
document.querySelector('button').addEventListener('click', (event) => {
    event.preventDefault(); // Stop link navigation until validation passes

    const firstName = document.querySelector('.Type1').innerText.trim();
    const lastName = document.querySelector('.Type2').innerText.trim();
    const cardType = document.querySelector('.Type3').innerText.trim();
    const cardNumber = document.querySelector('.Type4').innerText.trim();
    const cvv = document.querySelector('.Type5').innerText.trim();
    const month = document.querySelector('.Type6').innerText.trim();
    const year = document.querySelector('.Type7').innerText.trim();

    // Simple checks
    if (!firstName || firstName === 'Type here...') {
        alert('Please enter your first name.');
        return;
    }
    if (!lastName || lastName === 'Type here...') {
        alert('Please enter your last name.');
        return;
    }
    if (!cardType || cardType === 'Type here...') {
        alert('Please specify the card type.');
        return;
    }
    if (!/^\d{16}$/.test(cardNumber)) {
        alert('Card number must be 16 digits.');
        return;
    }
    if (!/^\d{3,4}$/.test(cvv)) {
        alert('CVV must be 3 or 4 digits.');
        return;
    }
    if (!/^\d{2}$/.test(month) || Number(month) < 1 || Number(month) > 12) {
        alert('Please enter a valid month (MM).');
        return;
    }
    if (!/^\d{2}$/.test(year)) {
        alert('Please enter a valid year (YY).');
        return;
    }

    // If all good:
    alert('Payment information accepted! Redirecting...');
    window.location.href = "/Home-pages/Pawpal-Homepage.Html";
});
