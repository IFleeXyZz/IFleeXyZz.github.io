let battleForm = document.getElementById('battleForm');
let battleID = document.getElementById('battleID');
let buttonID = document.getElementById('buttonID');


let htmlIntegrity = document.getElementById('Integrity');
let played = 0;

let copyright = '<p class="Aled text-white text-center copyright">Powered by IFleeXyZz#5790, Copyright © UKN Timer 2022. All right reserved. </p>';
var tempDiv = document.createElement('div');
tempDiv.id = "hereForCopy";
if (htmlIntegrity) {
    htmlIntegrity.insertAdjacentElement('beforeend',tempDiv);

}else{
    copyright = '<p class="Aled text-white text-center copyright">This site stole IFleeXyZz#5790 site, Copyright © UKN Timer 2022. All right reserved. </p>';
    var tempDiv2 = document.createElement('div');
    tempDiv2.id = "hereForCopy2";
    tempDiv.style.backgroundColor = "#000000";
    tempDiv2.style.backgroundColor = "#000000";
    document.body.insertAdjacentElement('afterbegin',tempDiv);
    document.body.insertAdjacentElement('beforeend',tempDiv2);
    document.getElementById('hereForCopy2').innerHTML = copyright;

}
document.getElementById('hereForCopy').innerHTML = copyright;


buttonID.addEventListener('click', function () {

    if(battleID.value && !isNaN(battleID.value)){
        let timePlayedTotal = 0;
        let playerName = "";
        let h = 0;
        let m = 0;
        let s = 0;
        let urlname = `https://api.battlemetrics.com/players/${battleID.value}`;
        let url1 = `https://api.battlemetrics.com/players/${battleID.value}/servers/7459421`;
        let url2 = `https://api.battlemetrics.com/players/${battleID.value}/servers/9778225`;
        let url3 = `https://api.battlemetrics.com/players/${battleID.value}/servers/6273666`;
        let url4 = `https://api.battlemetrics.com/players/${battleID.value}/servers/12171747`;
        let url5 = `https://api.battlemetrics.com/players/${battleID.value}/servers/12171979`;
        let url6 = `https://api.battlemetrics.com/players/${battleID.value}/servers/6392279`;
        let url7 = `https://api.battlemetrics.com/players/${battleID.value}/servers/9597356`;
        let url8 = `https://api.battlemetrics.com/players/${battleID.value}/servers/9597363`;
        let url9 = `https://api.battlemetrics.com/players/${battleID.value}/servers/6792417`;
        let url10 = `https://api.battlemetrics.com/players/${battleID.value}/servers/9778215`;

        Promise.all([
            fetch(url1),
            fetch(url2),
            fetch(url3),
            fetch(url4),
            fetch(url5),
            fetch(url6),
            fetch(url7),
            fetch(url8),
            fetch(url9),
            fetch(url10)
        ]).then(function (responses) {
            // Get a JSON object from each of the responses
            return Promise.all(responses.map(function (response) {
                return response.json();
            }));
        }).then(function (data) {
            for(let servers of data){
                if(servers.data){
                    timePlayedTotal += servers.data.attributes.timePlayed;
                }
            }
            if(timePlayedTotal>0){
                played = 1;
                while(timePlayedTotal>60){
                    if(timePlayedTotal>=3600){
                        h++;
                        timePlayedTotal -= 3600;
                    }else{
                        if(timePlayedTotal>=60){
                            m++;
                            timePlayedTotal -= 60;
                        }else{

                        }
                    }


                }
                if(timePlayedTotal<60){
                    s = timePlayedTotal;
                    timePlayedTotal = 0;
                }
            }else{
                played = 0;
            }

            fetch(urlname).then((res) =>
                res.json().then((dataname) => {

                    if(!dataname.errors){
                        if(played == 1){
                            playerName = dataname.data.attributes.name;
                            Swal.fire(
                                'Good job ' + playerName + ' !',
                                'You have ' + h + ' hours ' + m + ' minutes ' + s + ' seconds on UKN servers.',
                                'success'
                            )
                        }else{
                            playerName = dataname.data.attributes.name;
                            Swal.fire(
                                'Seriously ' + playerName + ' !',
                                'You never played on UKN servers.',
                                'warning'
                            )
                        }

                    }else{
                        Swal.fire(
                            'Error !',
                            'The battlemetrics ID you entered don\'t exist.',
                            'error'
                        )
                    }


                })
            );

        }).catch(function (error) {

        });



    }else if(isNaN(battleID)){
        Swal.fire(
            'Error !',
            'Only enter numbers , a battlemetrics ID is 9 number max.',
            'error'
        )
    }
});