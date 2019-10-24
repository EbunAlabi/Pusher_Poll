

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

let dataPoints = [
    { label: 'Prosperity Paradox', y: 0 },
    {label: 'Speaker for the Dead', y: 0},
    {label: 'Lessons by Ada', y: 0},
    {label: 'Pillow Talk', y: 0}
];

const chartContainer = document.querySelector('#chartContainer');

if (chartContainer){
    const chart = new CanvasJS.Chart('chartContainer',{
        animationEnabled: true,
        theme: 'theme1',
        title: {text: 'Book Results'},
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



