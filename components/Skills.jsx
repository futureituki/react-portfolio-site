import { Circle } from "react-circle"
import { useEffect,useReducer } from "react"
import axios from "axios"
import { skillReducers,initialState,actionTypes } from "../reducers/skillReducers"
import { requestStatus } from "../constants"

const converseCountToPercentage=(count)=>{
  if(count>10){
    return 100;
  }
  return count*10
}

export const Skills=()=>{
  const [state,dispatch]=useReducer(skillReducers,initialState)
  useEffect(()=>{
    dispatch({type:actionTypes.fetch})
    axios.get('https://api.github.com/users/futureituki/repos').then((respons)=>{
      const languageList=respons.data.map(res=>res.language);
      const countedLangugageList=generateLanguageCountObj(languageList);
      dispatch({type:actionTypes.success,payload:{languageList:countedLangugageList}});
      console.log({languageList})
    }).catch(()=>{
      dispatch({type:actionTypes.error})
    }) 
  },[])
  const generateLanguageCountObj=(allLanguageList)=>{
    const notNullLanguageList=allLanguageList.filter(language=>language!==null);
    const uniqueLanguageList=[...new Set(notNullLanguageList)];
    return uniqueLanguageList.map(item => {
      return {
        language: item,
        count: allLanguageList.filter(language => language === item).length
      }
    });
  }
  const sortedLanguageList=()=>(
    state.languageList.sort((firstLang,nextLang)=>nextLang.count-firstLang.count)
  )
  return(
    <div id="skills">
      <div className="container">
        <div className="heading">
          <h2>Skills</h2>
        </div>
        <div className="skills-container">
        {
           state.requestStatus === requestStatus.loading && (
             <p className="description">取得中...</p>
             )
         }
          {
            state.requestStatus===requestStatus.success &&(
              sortedLanguageList().map((item,index)=>(   
                   <div key={index} className="skill-item">
                     <p className="description"><strong>{item.language}</strong></p>
                     <Circle animate progress={converseCountToPercentage(item.count)} />
                   </div>
              ))
            )
          }
          {
            state.requestStatus===requestStatus.error && (
              <p className="description">エラーが発生しました</p>
            )
          }
        </div>
      </div>
    </div>
  )
}