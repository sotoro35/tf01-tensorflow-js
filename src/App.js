
import {useRef} from 'react'

const tf= require('@tensorflow/tfjs')
const mobilenet = require('@tensorflow-models/mobilenet');
const toxicity = require('@tensorflow-models/toxicity');

const App= ()=>{

  const imgRef= useRef()
  const clickBtn= ()=>{
    mobilenet.load().then((model)=>{
      model.classify(imgRef.current).then(results=>{
        console.log(results)
        console.log(results[0].className + "-" + results[0].probability)
      })
    })
  }

  const inputRef= useRef()
  const clickBtn2= ()=>{
    

    // 7가지 악성글 종류에 해당하는지 match 여부 확인 가능
    toxicity.load(0.9).then(model=>{

      // 영어만 됨.. 한글되려면 .. 언어변역 API는 다 유료.. 그래서 ml kit의 언어번역 사용. native app과 통신   
      const sentence= inputRef.current.value
      const sentences= [sentence,"I love you", "you suck"]

      model.classify(sentences).then(results=>console.log(results))
    })

  }

  return (
    <div style={{padding:16, }}>
      <img src="./assets/cat.jpg" style={{height:150,}} ref={imgRef}></img>
      <br></br>
      <button onClick={clickBtn}>image classification</button>


    <hr></hr>
    <input placeholder='some text...' ref={inputRef}></input>
    <button onClick={clickBtn2}>악성 댓글 감지</button>
    </div>
  )
}
export default App