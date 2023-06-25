
      // Import the functions you need from the SDKs you need
      import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
      import {
        getDatabase,
        ref,
        push,
        set,
        onChildAdded,
        remove,
        onChildRemoved,
      } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js";
      // Your web app's Firebase configuration
      const firebaseConfig = {
        apiKey: "AIzaSyBIXBvW0cfRejTaCvahVIivXnIfhBLLS5k",
        authDomain: "gsdev0603-f3efd.firebaseapp.com",
        projectId: "gsdev0603-f3efd",
        storageBucket: "gsdev0603-f3efd.appspot.com",
        messagingSenderId: "1091426377532",
        appId: "1:1091426377532:web:9947b82beb0eb769070839",
      };
      const app = initializeApp(firebaseConfig);
      const db = getDatabase(app); //RealtimeDBに接続
      const dbRef = ref(db, "chat"); //RealtimeDB内の"chat"を使う

      //データ登録(Click)

      $("#send").on("click",function(){

        const name =$("#name").val()
        const day =$("#day").val()
        const time =$("#time").val()
        const restTime =$('input[name="restTime"]:checked').val();
        const time_leave =$("#time_leave").val()
        const text =$("#text").val()

        const msg = { 
          name:$("#name").val(),
          day:$("#day").val(),
          time:$("#time").val(),
          restTime:$('input[name="restTime"]:checked').val(),
          time_leave:$("#time_leave").val(),
          text:$("#text").val(),
        }

        const newPostRef = push (dbRef)
        set(newPostRef,msg);

        $("#name").val("");
        $("#day").val("");
        $("#time").val("");
        $('input[name="restTime"]:checked').val("");
        $("#time_leave").val("");
        $("#text").val("");
       


        // alert(uname+text);


        //この命令はJSじゃない、中はJS
        onChildAdded(dbRef,function(data){
          const msg = data.val();
          console.log(msg,"勤怠履歴");

          const key = data.key;
          console.log(key,"かぎ")

          let html = `
             <div id = ${key}>
              <p>名前:${msg.name}</p>
              <p>日付:${msg.day}</p>
              <p>出勤時間:${msg.time}</p>
              <p>休憩時間:${msg.restTime}</p>
              <p>退勤時間:${msg.time_leave}</p>
              <p>引き継ぎメモ:${msg.text}</p>
             </div>
          `

          $("#output").append(html)
          $("#output").fadeIn(html)
          $("#output").addClass("rireki")
          $(".close").fadeIn(2000)
        })


      })

      $(".close").on("click",function(){
        $("#output").removeClass("rireki")
        $(this).hide()
      })

     

      $(".s1").on("click",function(){
        $(".kintai_name").fadeToggle();
      })

      $(".s2").on("click",function(){
        $(".kintai_data").fadeToggle();
      })

      $(".s3").on("click",function(){
        $(".kintai_time").fadeToggle();
      })

      $(".s4").on("click",function(){
        $(".kintai_rest").fadeToggle();
      })

      $(".s5").on("click",function(){
        $(".kintai_leave").fadeToggle();
      })

      $(".s6").on("click",function(){
        $(".kintai_text").fadeToggle();
      })


      $(".manu_icon").on("click",function(){
        $(".star_wrap").fadeIn()
      })


      



      //データ登録(Enter)

      //最初にデータ取得＆onSnapshotでリアルタイムにデータを取得
