import swal from 'sweetalert'
import axios from 'axios'


const saveHistory = async (answer, quizz) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  
    if (userInfo) {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json', 
            Authorization: `Bearer ${userInfo.token}`
          }
        }
  
        const history = {
          type: quizz.correctMultimedia ? "quizzFR" : "quizzLSF", 
          details: quizz, 
          isCorrect: answer
        }
  
        console.log(history);
  
        await axios.post(`api/history`, history, config)
      
      } catch (err) {
        console.error(err);
      }
    }
}

const notif = (
    e,
    quizz,
    getData,
    setChecked
) => {
    let status = false;
    const answer = e.target ? e.target.value : e
    const correct = quizz.correctMultimedia || quizz.correctWord
    if (answer === correct) {
        status = true
    }
    swal({
        title: status ? "Bien joué !" : "Oh non :-(",
        text: status ? "Tu as choisis la bonne réponse !" : "Tu as choisis la mauvaise réponse ! Reéssaies !",
        icon: status ? "success" : "error",
        button: {
            text: "Suivant",
            value: true,
            visible: true,
            className: status ? "green-bg" : "red-bg",
            closeModal: true,
        },
        closeOnClickOutside: false,
        closeOnEsc: false,
    }).then(() => {
        saveHistory(status, quizz)
        getData()
        setChecked(false)
    });
}

export default notif