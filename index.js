const audioClips = [
    {
      keyCode: 81,
      keyTrigger: 'Q',
      id: 'Heater-1',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
    },
    {
      keyCode: 87,
      keyTrigger: 'W',
      id: 'Heater-2',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
    },
    {
      keyCode: 69,
      keyTrigger: 'E',
      id: 'Heater-3',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
    },
    {
      keyCode: 65,
      keyTrigger: 'A',
      id: 'Heater-4',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
    },
    {
      keyCode: 83,
      keyTrigger: 'S',
      id: 'Clap',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
    },
    {
      keyCode: 68,
      keyTrigger: 'D',
      id: 'Open-HH',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
    },
    {
      keyCode: 90,
      keyTrigger: 'Z',
      id: "Kick-n'-Hat",
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
    },
    {
      keyCode: 88,
      keyTrigger: 'X',
      id: 'Kick',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
    },
    {
      keyCode: 67,
      keyTrigger: 'C',
      id: 'Closed-HH',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
    }
  ];
  
let powerSwitch = false;

const App = () => {
    const [volume, setVolume] = React.useState(1);
    const [text, setText] = React.useState("");

    return(
        <div className="container text-center mt-5 mh-5" id="drum-machine">
            <h3 className="text-center pt-4">Drum Machine</h3>
            <h6 className="text-center"><a href="http://bhindi.myweb.cs.uwindsor.ca/" target="_blank"><b>by Jenil</b></a></h6>
            <div className="row">
                <div className="container col-6 p-5 drum-pad">
                    {audioClips.map((clip) => (
                        <Pad key={clip.id} clip={clip} volume={volume} setText={setText}/>
                    ))}
                </div>
                <div className="container col-6 p-5">
                        <div className="custom-control custom-switch pt-2">
                            <input type="checkbox" className="custom-control-input" id="customSwitch1" 
                            onChange={e=>{powerSwitch=!powerSwitch}}/>
                            <label className="custom-control-label" htmlFor="customSwitch1">Power</label>
                        </div>
                        <div className="card mt-5 vertical-align">
                            <div className="card-body vertical-align" id="display">
                                {text}
                            </div>
                        </div>
                        <div className="pt-5">
                        <input type="range" step="0.01" id="slider" onChange={(e)=>{setVolume(e.target.value);setText(`Volume: ${Math.floor(volume*100)}`); document.getElementById("slider").addEventListener("mouseup",()=>{setTimeout(()=>{setText("")},100)})}} value={volume} max="1" min="0" />
                        </div>
                </div>
            </div>
        </div>
    )
}

const Pad = ({clip, volume, setText}) => {

    const[active,setActive] = React.useState(false);

    React.useEffect(() => {
        document.addEventListener('keydown',handleKeyDown);
        return () => {
            document.removeEventListener('keydown',handleKeyDown);
        }
    }, [])

    const handleKeyDown = (e) => {
        if(e.keyCode === clip.keyCode){
            playSound();
            
        }
    }

    const playSound = () =>{
        if(powerSwitch){
            const audioTag = document.getElementById(clip.keyTrigger);
            setText(clip.id);
            setActive(true);
            setTimeout(()=>{
                setActive(false); setText("")},200
            )
            audioTag.volume = volume;
            audioTag.currentTime = 0;
            audioTag.play();
        }
    }

    return(
        <div onClick={playSound} className={`btn btn-secondary p-4 m-1 ${active && 'btn-warning'} pads`}>
            <audio className="clip" id={clip.keyTrigger} src={clip.url}/>
            {clip.keyTrigger}
        </div>
    )
}

ReactDOM.render(<App/>, document.getElementById('app'));