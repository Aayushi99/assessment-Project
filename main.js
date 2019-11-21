window.addEventListener('load', ()=> {
    var long;
    var lat;
    const temperatureDescription = document.querySelector('.temperature-description');
    const temperatureDegree = document.querySelector('.temperature-degree');
    const locationTimezone = document.querySelector('.location-timezone');
    const temperatureSection = document.querySelector('.temperature-section');
    const temperatureSpan = document.querySelector('.temperature-section span')

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/'
            const api = proxy+'https://api.darksky.net/forecast/4dd160f2a670fa7a49ad86b5895dde77/'+lat+','+long;
            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data)
                const {temperature, summary, icon} = data.currently;

                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;

                let celsius = (temperature - 32)*(5/9);
                setIcons(icon,document.querySelector('.icon'));

                temperatureSection.addEventListener('click', ()=> {
                    if(temperatureSpan.textContent === 'F'){
                        temperatureSpan.textContent = 'C';
                        temperatureDegree.textContent = celsius.toFixed(2);
                    }
                    else{
                        temperatureSpan.textContent = 'F';
                        temperatureDegree.textContent = temperature;
                    }
                })


            })
        })
        
          

    }
    else{
        alert('Failed To Access Your Location!')

    }

    function setIcons(icon,iconID){
        const skycons = new Skycons({color: 'white'});
        const currentIcon = icon.replace(/-/g,'_').toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});