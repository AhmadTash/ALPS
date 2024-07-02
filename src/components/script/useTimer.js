import { ref, computed, onUnmounted } from 'vue';




export function useTimer(priorSec,priorMin) {
  const min = ref(priorMin||0);
  const sec = ref(priorSec||0);
  let startTimer = null;

  const formattedTime = computed(() => {
    let pmin = min.value < 10 ? `0${min.value}` : min.value;
    let psec = sec.value < 10 ? `0${sec.value}` : sec.value;
    return `${pmin}:${psec}`;
  });

  function postTimer() {
    if (startTimer) return; 
    startTimer = setInterval(() => {
      sec.value++;
      if (sec.value === 60) {
        min.value++;
        sec.value = 0;
      }
    }, 1000);
  }

  function stopTimer() {
    if (startTimer) {
      clearInterval(startTimer);
      startTimer = null;
    }
  }


  function resetTimer() {
    min.value = 0;
    sec.value = 0;
  }


  onUnmounted(() => {
    if (startTimer) clearInterval(startTimer);
  });

  return {
    formattedTime,
    min,
    sec,
    postTimer,
    stopTimer,
    resetTimer
  };
}
