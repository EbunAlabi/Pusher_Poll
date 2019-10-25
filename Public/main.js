

const form = document.getElementById('vote-form');
var event;
//form submit event
form.addEventListener('submit', (e) => {
    
    const choice = document.querySelector('input[name=book]:checked').value;
    const data = {book: choice};

    fetch('http://localhost:3000/poll',{
        method: 'post',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));

    e.preventDefault();
});


fetch('http://localhost:3000/poll')
.then(res => res.json())
.then (data => {
    const votes = data.votes;
    const totalVotes = votes.length;
    //count vote points - acc/current value
    //look up this reduce method
    const voteCounts = votes.reduce(
        (acc, vote)=> 
        ((acc[vote.book]=(acc[vote.book] || 0) + parseInt(vote.points)), acc), {});






        let dataPoints = [
            { label: 'Prosperity', y: voteCounts.Prosperity },
            {label: 'Speaker', y: voteCounts.Speaker},
            {label: 'Lessons', y: voteCounts.Lessons},
            {label: 'Pillow', y: voteCounts.Pillow}
        ];
        
        const chartContainer = document.querySelector('#chartContainer');
        
        if (chartContainer){
            const chart = new CanvasJS.Chart('chartContainer',{
                animationEnabled: true,
                theme: 'theme1',
                title: {text: `Total Votes ${totalVotes}`},
                data: [{type: 'column',
                        dataPoints: dataPoints
            }]
            });
            chart.render();
        
            // Enable pusher logging - don't include this in production
            Pusher.logToConsole = true;
        
            var pusher = new Pusher('f95f421097f5e04d3e1e', {
              cluster: 'eu',
              forceTLS: true
            });
        
            
            var channel = pusher.subscribe('book-poll');
            channel.bind('book-vote', function(data) {
                
              dataPoints = dataPoints.map(x =>{
                console.log('this is datapoints ', x);
                  if(x.label == data.book){
                      x.y += data.points;
                      console.log('this is x ', x);
                      console.log('this is points ', dataPoints);
                      return x;
                  }else{
                      return x;
                  }
              });
              chart.render();
            });
        
        
        
        
        }
        



});



