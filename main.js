const tempData = {
    data: [],
    pageNo: 1,
    async getApiInfo() {
    //    console.log(pageNo);
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/photos?_page=${this.pageNo}`
        );
        return await response.json();
      } catch (err) {
        console.log(err);
      }
    },
  };
  
  const UI = {
    Selector() {
      const btnNextElm = document.querySelector("#btnNext");
      const btnPreviousElm = document.querySelector("#btnPrevious");
  
      return { btnNextElm, btnPreviousElm};
    },
  
    async showData() {
      const intialValue = tempData.pageNo * 10 - 10;
      const valueToSlice = tempData.data.slice(intialValue, intialValue + 10);
  
      console.log(valueToSlice);
      const selectDivElm = document.querySelector(".gallery");
      let selectItem = "";
      // const data = tempData.data;
      for (const key of valueToSlice) {
        //console.log(key);
        selectItem += `<div class="reSize">
        <a href=${key.url}>Download</a>
        <img src="${
          key.thumbnailUrl
        }" alt="test"/>
        <p class="text"> ${
          key.title.length > 10 ? key.title.slice(0, 10) : key.title
        }</p>
        </div>`;
           
  
        selectDivElm.innerHTML = selectItem;
      }
    },
  
    init() {
      const { btnNextElm, btnPreviousElm } = this.Selector();
  
      btnNextElm.addEventListener("click", async (e) => {
        console.log("clickNext");
        tempData.pageNo++;
        const saveData = await tempData.getApiInfo();
        tempData.data.push(...saveData);
        this.showData();
      });
  
      btnPreviousElm.addEventListener("click", async (e) => {
        console.log("clickPrevious");
        if (tempData.pageNo < 2) {
          btnPreviousElm.setAttribute("disabled", "disabled");
        } else {
          tempData.pageNo--;
          const saveData = await tempData.getApiInfo();
          tempData.data.push(...saveData);
          this.showData();
        }
      });
  
      document.addEventListener("DOMContentLoaded", async (e) => {
        const saveData = await tempData.getApiInfo();
        tempData.data.push(...saveData);
        //console.log(tempData.data);
        this.showData();
      });
    },
  };
  
  UI.init();
