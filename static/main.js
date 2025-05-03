$(document).ready(function () {
    $('a[href^="#"]').on('click', function (event) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top
            }, 1000);
        }
    });

    $('#cropForm').on('submit', function (e) {
        e.preventDefault();
        
        const formData = {
            ph: $('#phInput').val(),
            N: $('#NInput').val(),
            P: $('#PInput').val(),
            K: $('#KInput').val(),
            rainfall: $('#rainfallInput').val(),
            city: $('#cityInput').val().trim()
        };

        console.log("Raw form values:", formData);

        const errors = [];
        
        if (!formData.city) errors.push("City is required");
        
        const numericFields = {
            'pH': formData.ph,
            'Nitrogen (N)': formData.N,
            'Phosphorus (P)': formData.P,
            'Potassium (K)': formData.K,
            'Rainfall': formData.rainfall
        };

        for (const [field, value] of Object.entries(numericFields)) {
            const numValue = parseFloat(value);
            if (isNaN(numValue)) {
                errors.push(`${field} must be a number`);
            } else {
                formData[field.toLowerCase()] = numValue; // Update with parsed number
            }
        }

        console.log("Parsed form values:", {
            ph: formData.ph,
            N: formData.N,
            P: formData.P,
            K: formData.K,
            rainfall: formData.rainfall,
            city: formData.city
        });

        if (errors.length > 0) {
            alert("Please fix these errors:\n" + errors.join("\n"));
            return;
        }

        const submitBtn = $('#submitCropData');
        submitBtn.html('<i class="fa fa-spinner fa-spin"></i> Processing...').prop('disabled', true);

        const apiData = {
            ph: parseFloat(formData.ph),
            N: parseFloat(formData.N),
            P: parseFloat(formData.P),
            K: parseFloat(formData.K),
            rainfall: parseFloat(formData.rainfall),
            city: formData.city
        };

        // Debug: Log API payload
        console.log("Sending to API:", apiData);

        // Send to server
        fetch('/recommend', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(apiData)
        })
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            if (data.error) throw new Error(data.error);
            showResult(data);
        })
        .catch(error => {
            alert('Error: ' + error.message);
            console.error('Error:', error);
        })
        .finally(() => {
            submitBtn.html('Get Crop Recommendation').prop('disabled', false);
        });
    });
    
    function showResult(data) {
        const resultHtml = `
            <div class="alert alert-success" style="margin-top: 20px;">
                <h4>Recommended Crop: <strong>${data.crop.toUpperCase()}</strong></h4>
                <p>Based on current conditions:</p>
                <ul>
                    <li>Temperature: ${data.temperature}°C</li>
                    ${data.humidity ? `<li>Humidity: ${data.humidity}%</li>` : ''}
                </ul>
            </div>
        `;
        
        $('#cropForm').after(resultHtml);
        
        $('html, body').animate({
            scrollTop: $('#cropForm').offset().top + $('#cropForm').height() + 50
        }, 500);
    }
});
