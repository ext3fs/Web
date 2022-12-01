/*
' -----------------------------------------------------
'   페이지명 : jscripts/jc_common.js
'   최초작성 : 2004-04-20
'   업데이트 :
'   호출리스트 :
'   페이지설명 : 공통적으로 사용하는 함수 모음
' -----------------------------------------------------
*/
var gs_url_path = "/wt_board";

/*
' ------------------------------------------------------------------
' Function    :
' Description : Dynamic 스크립트 사용을 위한 컨트롤 삽입
' Argument    :
' Return      :
' ------------------------------------------------------------------
*/
document.writeln("<script type=\"text/javascript\" id=\"j_dynamic\"><\/script>");

var gbn_over_check = false; // 중복체크시 필요한 global 변수
var gs_server_time = "";    // 서버시간

/*
' ------------------------------------------------------------------
' Function    : fc_number_format(ari_number)
' Description : 숫자를 받아서 ,를 찍어준다.(동적으로 변형시킬때는 fc_coma를 사용할것)
' Argument    : Integer 치환할 숫자
' Return      : String ,찍은 숫자
' ------------------------------------------------------------------
*/
function fc_number_format(ari_number)
{
   // 받은 숫자를 문자로 변환해준다.
   var ls_number = String(ari_number);

   // 정규표현식
   var lo_reg = /(\d+)(\d{3})($|\..*)/;

   if (lo_reg.test(ls_number))
      return ls_number.replace(lo_reg,function(str,p1,p2,p3) { return fc_number_format(p1) + "," + p2 + p3; });
   else
      return ls_number;
}

/*
' ------------------------------------------------------------------
' Function    : fc_obj_coma(aro_name)
' Description : 해당오브젝트에 컴마를 붙여준다.fc_coma(ars_number)와 셋트
' Argument    : Integer 치환할 숫자
' Return      : String ,찍은 숫자
' ------------------------------------------------------------------
*/
function fc_obj_coma(aro_name)
{
   var keyCode = event.keyCode;
   if ( ((keyCode>=48) && (keyCode <= 105)) || (keyCode==8) || (keyCode==13) || (keyCode==35) || (keyCode==46) )
   {
      //0(48)~숫자키패드9(105), enter(13), bakspace(8), delete(46), end(35) key 일 때만 처리한다.
      aro_name.value = fc_coma(aro_name.value);

   }
}

/*
' ------------------------------------------------------------------
' Function    : fc_coma(ars_number)
' Description : 3자리마다 컴마반환,fc_obj_coma(aro_name)와 셋트로 사용할것
' Argument    : String 치환할 숫자
' Return      : String ,찍은 숫자
' ------------------------------------------------------------------
*/
function fc_coma(ars_number)
{
   var li_explo;
   var li_explo = ars_number.length;
   var ls_str = "";


   for (var k = (li_explo); k >= 0 ; k--)
   {
      if(ars_number.substring(k-1,k) != ",")
      {
         ls_str = ars_number.substring(k-1,k) + ls_str;
      }
   }

   li_explo = ls_str.length;

   var ls_msg = "";
   var li_no =1;

   for (var k = (li_explo); k >= 0 ; k--)
   {
      if(li_no == 3 && k != 0)
      {
         ls_msg = ls_str.substring(k-1,k) + "," + ls_msg;
         li_no = 0;
      }
      else
      {
         ls_msg = ls_str.substring(k-1,k) + ls_msg ;
      }
      li_no++;
   }
   return ls_msg;
}

/*
' ------------------------------------------------------------------
' Function    : fc_input_num()
' Description : 숫자만 입력받게한다. onkeypress할때 fc_input_num()이라고 지정함
' Argument    :
' Return      :
' ------------------------------------------------------------------
*/
function fc_input_num()
{
   if(event.keyCode<48 || event.keyCode>57)
      event.returnValue=false;
}


/*
' ------------------------------------------------------------------
' Function    : fc_input_num()
' Description : 숫자를 입력받으며 또한 - 도 입력할수 있게한다.(계좌번호 넣을때사용)
' Argument    :
' Return      :
' ------------------------------------------------------------------
*/
function fc_input_num2()
{
   if(event.keyCode !=45)
   {
      if(event.keyCode !=9)
      {
         if(event.keyCode<48 || event.keyCode>57)
            event.returnValue=false;
      }
   }
}

/*
' ------------------------------------------------------------------
' Function    : fc_auto_next_focus()
' Description : maxlength가 지정되어 있으면 자동으로 포커스를 그다음으로 이동한다.
'               ex) <input type=text name=txt_test maxlength=4 onkeypress=fc_auto_next_focus() />
'               지속적으로 고쳐야 할듯 ㅡㅡ;;
' Argument    :
' Return      :
' ------------------------------------------------------------------
*/
function fc_auto_next_focus()
{
   // 이벤트가 일어난 객체를 받는다.
   var lo_this        = window.event.srcElement;

   // 해당객체의 maxlength를 받는다.
   var li_max_length  = lo_this.maxLength;

   // 0이상 100이하인것만 포커스를 이동한다.
   if(li_max_length > 0 && li_max_length < 100)
   {
      // 전체 컨트롤들을 돌면서
      for (i=(document.all.length-1); i>=0; i--)
      {
         // 현재 이벤트가 일어난 다음 컨트롤로 포커스를 이동한다.
         if(document.all[i] == lo_this)
         {
            // maxLength를 체크한다.
            if(lo_this.value.length >= li_max_length)
            {
               // 객체가 존재하고 히든컨트롤이 아닐경우만 포커스를 이동한다.
               if(document.all[i+1] != undefined && document.all[i+1].type != "HIDDEN")
               {
                  document.all[i+1].focus();
                  break;
               }
               else
               {
                  break;
               }
            }
            else
            {
               break;
            }
         }
      }
   }
}

/*
' ------------------------------------------------------------------
' Function    : fc_trim(ars_value)
' Description : 공백을 모두날림
' Argument    : String 치환할 문자
' Return      : String 공백을 제거한 문자
' ------------------------------------------------------------------
*/
function fc_trim(ars_value)
{
   return ars_value.replace(/\s/g,'');
}

/*
' ------------------------------------------------------------------
' Function    : fc_del_coma(ars_value)
' Description : 컴마를 날림
' Argument    : String 치환할 문자
' Return      : String 컴마를 제거한 문자
' ------------------------------------------------------------------
*/
function fc_del_coma(ars_value)
{
   return ars_value.replace(/,/g,'');
}

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
// Begin 각종체크 함수
// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

/*
' ------------------------------------------------------------------
' Function    : fc_han_chk(ars_str)
' Description : 한글인지 아닌지 체크한다.정규표현식을 이용한다.
' Argument    : String 체크할 문자
' Return      : 한글이면 true 영문이면 false
' ------------------------------------------------------------------
*/
function fc_han_chk(ars_str)
{
   var lo_pattern = /[가-힝]/;

   return (lo_pattern.test(ars_str)) ? true : false;
}


/*
' ------------------------------------------------------------------
' Function    : fc_name_check(ars_name)
' Description : 이름 유효성체크
' Argument    : String 체크할 문자
' Return      : 정상적인 이름이면 true 그밗에는 false
' ------------------------------------------------------------------
*/
function fc_name_check(ars_name)
{
   var lo_pattern = /[ ^@&#$*!%\\|.,\/?0-9a-zA-Z]/;
   return (lo_pattern.test(ars_name)) ? false : true;
}

/*
' ------------------------------------------------------------------
' Function    : fc_email_check(ars_str)
' Description : 이메일 체크함수
' Argument    : String 체크할 문자
' Return      : 정상적이면 true 비정상적이면 false
' ------------------------------------------------------------------
*/
function fc_email_check(ars_str)
{
   var lo_pattern = /^[_a-zA-Z0-9-\.]+@[\.a-zA-Z0-9-]+\.[a-zA-Z]+$/;
   return (lo_pattern.test(ars_str)) ? true : false;
}
/*
' ------------------------------------------------------------------
' Function    : fc_homepage_check(ars_str)
' Description : 홈페이지 체크함수
' Argument    : String 체크할 문자
' Return      : 정상적이면 true 비정상적이면 false
' ------------------------------------------------------------------
*/
function fc_homepage_check(ars_str)
{
   var lo_pattern = /^[\.a-zA-Z0-9-]+\.[a-zA-Z]+$/;
   if(lo_pattern.test(ars_str) == true) window.open('http://' + ars_str);
}

/*
' ------------------------------------------------------------------
' Function    : fc_id_check(ars_str)
' Description : 아이디 체크함수
' Argument    : String 체크할 문자
' Return      : 정상적이면 true 비정상적이면 false
' ------------------------------------------------------------------
*/
function fc_id_check(ars_str)
{
   // 5자이상 21자 미만만 등록가능하도록 한다.
   // 영문,숫자, _ 문자만 사용할 수 있도록 한다.
   var lo_pattern = /^[a-zA-Z]{1}[a-zA-Z0-9_]{4,21}$/;
   return (lo_pattern.test(ars_str)) ? true : false;
}

/*
' ------------------------------------------------------------------
' Function    : fc_passwd_check(ars_str)
' Description : 패스워드 체크함수
' Argument    : String 체크할 비밀번호
' Return      : 정상적이면 true 비정상적이면 false
' ------------------------------------------------------------------
*/
function fc_passwd_check(ars_str)
{
   // 5자이상 33자 미만만 등록가능하도록 한다.
   // 영문,숫자, _ 문자만 사용할 수 있도록 한다.
   var lo_pattern = /^[a-zA-Z]{1}[a-zA-Z0-9_]{4,33}$/;
   return (lo_pattern.test(ars_str)) ? true : false;
}

/*
' ------------------------------------------------------------------
' Function    : fc_compare_check(ars_text1,ars_text2)
' Description : 같은지 비교
' Argument    : String 비교할문자1,String 비교할문자2
' Return      : 정상적이면 true 비정상적이면 false
' ------------------------------------------------------------------
*/
function fc_compare_check(ars_text1,ars_text2)
{
   return (ars_text1 == ars_text2)  ? true : false;
}

/*
' ------------------------------------------------------------------
' Function    : fc_alpha_check(ars_str)
' Description : 영문자만 사용가능체크
' Argument    : String 체크할 문자
' Return      : 정상적이면 true 비정상적이면 false
' ------------------------------------------------------------------
*/
function fc_alpha_check(ars_str)
{
   var lo_pattern = /^[a-zA-Z]+$/;
   return (lo_pattern.test(ars_str)) ? true : false;
}

/*
' ------------------------------------------------------------------
' Function    : fc_num_check(ars_str)
' Description : 숫자만 사용가능 체크
' Argument    : String 체크할 문자
' Return      : 정상적이면 true 비정상적이면 false
' ------------------------------------------------------------------
*/
function fc_num_check(ars_str)
{
   var lo_pattern = /^[0-9]+$/;
   return (lo_pattern.test(ars_str)) ? true : false;
}

/*
' ------------------------------------------------------------------
' Function    : fc_jumin_check(ars_str)
' Description : 주민등록번호 체크
' Argument    : String 체크할 문자
' Return      : 정상적이면 true 비정상적이면 false
' ------------------------------------------------------------------
*/
function fc_jumin_check(ars_str)
{
   // [숫자 6자리] 다음 [-] 다음 [숫자 7 자리] 인지 체크한다.
   var lo_pattern = /^([0-9]{6})-?([0-9]{7})$/;
   if (!lo_pattern.test(ars_str)) return false;

   // - 제외한 값을 받는다.
   var li_num   = RegExp.$1 + RegExp.$2;

   var li_sum   = 0;
   var li_last  = li_num.charCodeAt(12) - 0x30;
   var ls_bases = "234567892345";

   for (var i=0; i<12; i++)
   {
      // 숫자가 아니면 false
      if (isNaN(li_num.substring(i,i+1))) return false;

      // 전체합계를 낸다.
      li_sum += (li_num.charCodeAt(i) - 0x30) * (ls_bases.charCodeAt(i) - 0x30);
   }
   var li_mod = li_sum % 11;
   return ((11 - li_mod) % 10 == li_last) ? true : false;
}

/*
' ------------------------------------------------------------------
' Function    : fc_busi_check(ars_str)
' Description : 사업자등록번호 체크
' Argument    : String 체크할 문자
' Return      : 정상적이면 true 비정상적이면 false
' ------------------------------------------------------------------
*/
function fc_busi_check(ars_str)
{
   // 체크예 609-11-80753 형식에 맞는지 체크한다.
   var lo_pattern = /([0-9]{3})-?([0-9]{2})-?([0-9]{5})/;
   if (!lo_pattern.test(ars_str)) return false;

   // - 제외한 값을 받는다.
   var li_num  = RegExp.$1 + RegExp.$2 + RegExp.$3;
   var li_cval = 0;

   for (var i=0; i<8; i++)
   {
      var li_key_num = parseInt(((_tmp = i % 3) == 0) ? 1 : ( _tmp  == 1 ) ? 3 : 7);
      li_cval += (parseFloat(li_num.substring(i,i+1)) * li_key_num) % 10;
   }
   var ls_temp = parseFloat(li_num.substring(i,i+1)) * 5 + '0';
   li_cval += parseFloat(ls_temp.substring(0,1)) + parseFloat(ls_temp.substring(1,2));

   return (parseInt(li_num.substring(9,10)) == 10-(li_cval % 10)%10) ? true : false;
}


/*
' ------------------------------------------------------------------
' Function    : fc_phone_check(ars_str)
' Description : 전화번호 체크
' Argument    : String 체크할 문자
' Return      : 정상적이면 true 비정상적이면 false
' ------------------------------------------------------------------
*/
function fc_phone_check(ars_str)
{
   var lo_pattern = /^([0]{1}[0-9]{1,2})-?([1-9]{1}[0-9]{2,3})-?([0-9]{4})$/;
   return (lo_pattern.test(ars_str)) ? true : false;
}

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
// End 각종체크 함수
// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

/*
' ------------------------------------------------------------------
' Function    : fc_form_hidden(ars_form,ars_name,ars_value)
' Description : 폼에서 hidden 컨트롤을 삽입하는 함수
' Argument    : String 폼이름,String 삽일할 객체이름,String 삽입할 값
' Return      :
' ------------------------------------------------------------------
*/
function fc_form_hidden(ars_form,ars_name,ars_value)
{
   var ls_html = "";

   ls_html = "<input type=\"hidden\" name=\"" + ars_name  + "\" />";

   eval("document.all." + ars_form ).insertAdjacentHTML("beforeEnd", ls_html);
   eval("document.all." + ars_form + "." + ars_name).value = ars_value;
}

/*
' ------------------------------------------------------------------
' Function    : fc_form_reset(aro_form)
' Description : 폼을 리셋시키는 함수
' Argument    : Object 폼
' Return      :
' ------------------------------------------------------------------
*/
function fc_form_reset(aro_form)
{
   aro_form.reset();
}

/*
' ------------------------------------------------------------------
' Function    : fc_display(ars_name)
' Description : display 속성을 제어한다. 현재속성을 보고 none일경우는 보이게
'               반대일 경우에는 none으로 안보이게 제어한다.
' Argument    : 제어할 객체이름
' Return      :
' ------------------------------------------------------------------
*/
function fc_display(ars_name)
{
   var lo_name = eval("document.all." + ars_name);

   if(lo_name.style.display == "")
   {
      lo_name.style.display = "none";
   }
   else
   {
      lo_name.style.display = "";
   }
}

/*
' ------------------------------------------------------------------
' Function    : fc_querystring(ars_name)
' Description : url의 querystring을 리턴
' Argument    : String 체크할 파라메타
' Return      : String 파라메타의 값
' ------------------------------------------------------------------
*/
function fc_querystring(ars_name)
{
   var lo_result    = new Array;
   var ls_url_query = self.location.search; // url에서 ? 부터의 문자열
   var lo_array1    = new Array; // & 로 분리시킨 값이 들어갈배열
   var lo_array2    = new Array; // = 로 분리시킨 값이 들어갈배열
   var i = 0;

/*
   var ls_domain  = "http://" + document.domain; // 도메인정보
   var ls_c_url   = document.URL.replace("#none","");    // URL 정보
   var lo_split   = ls_c_url.split("?");
   var ls_url     = lo_split[0].replace(ls_domain,"")
	ls_url			= ls_url.split("#");
	ls_url			= ls_url[0];

   var regExp = /(\d+)(\d{3})($|\..*)/;
	regExp = /^:(\d{2,4})+[\/]/;

	ls_url			= ls_url.replace(regExp,'/');

   return ls_url;

*/

   ls_url_query = ls_url_query.slice(1);      // 첫문자 ?는 자르고
   lo_array1    = ls_url_query.split("&");    // & 배열로 나눈다.

   for(i=0; i< lo_array1.length; i++)
   {
      lo_array2 = lo_array1[i].split("=");    // = 배열나누기
      lo_result[lo_array2[0]] = lo_array2[1]; // 결과를 lo_result에 저장
   }

   if(lo_result[ars_name] != null)
   {
      return lo_result[ars_name];
   }
   else
   {
      return "";
   }
}

/*
' ------------------------------------------------------------------
' Function    : fc_color_init()
' Description : 색깔을 선택하는 Layer를 초기화한다.
'               예제 <input type="button" value="색상선택" onclick="fc_color_init(this);" />
'               fc_color_over()와  fc_color_click() 등은 셋트다
' Argument    : Object 해당폼의 object
' Return      :
' ------------------------------------------------------------------
*/
// 전역변수 선언
var go_div_color;

function fc_color_init()
{
   // 이벤트가 일어난 객체를 받는다.
   go_div_color = window.event.srcElement;
   var ls_color = go_div_color.style.backgroundColor;
   //alert(ls_color);

   var x,y;
   x = (document.layers) ? loc.pageX : event.clientX;
   y = (document.layers) ? loc.pageY : event.clientY;

   lo_map = new Array(9);
   /*
   lo_map[0] = new Array("black", "lime",   "#fefefe","#fefefc","#fff7f7","#fefcfc","#fffff7","#fffaf4","#f7fff7","#f4faff","#f7f7ff","#fafcfc","#f7fbff","#fff4fa","#f4fcff","#f7f7ff","#fafafc","#fffbfd","#fff4ff","#f8f0ff","#f9fdf9","#fcfaf8","#fffdf4","#f5faf9","#f8f9fc","#fcfcf1","#fef8f5","#faf0fb","#f2fcfd","#00ff80","#a4fc22");
   lo_map[1] = new Array("white", "aqua",   "#e6e6e6","#fafaf3","#ffeeee","#f8efef","#ffffe8","#fff2e6","#e8ffe8","#dfefff","#e1e1ff","#eef7f7","#e6f2ff","#ffe8f3","#e6f7ff","#e8e8ff","#eeeef7","#ffe6f2","#ffdfff","#ebd7ff","#edf8ed","#f5efeb","#fff8dd","#e6f2ee","#dfe6f0","#f3f2d3","#fbebe8","#efdaf3","#d1f4f8","#4563c9","#af6cd3");
   lo_map[2] = new Array("green", "fuchsia","#d7d7d7","#f0f0e1","#ffd7d7","#f2e6e6","#ffffd9","#ffe8d0","#d2ffd2","#cae4ff","#d2d2ff","#daeded","#cee7ff","#ffd8eb","#c8edff","#d2d2ff","#e1e1f0","#ffd2e9","#ffcaff","#ddbbff","#dff0df","#eee2db","#fef0c0","#cfe9e1","#ccd6e8","#eeecbd","#f7d9cc","#e4beeb","#b1eef3","#6a6a00","#ac67ff");
   lo_map[3] = new Array("maroon","silver", "#c3c3c3","#e1e1c4","#ffbfbf","#eddcdc","#ffffca","#ffddbb","#97ff97","#acd6ff","#b3b3ff","#bddfdf","#b3d9ff","#ffbbdd","#b0e6ff","#c1c1ff","#cbcbe4","#ffbfdf","#ffb5ff","#ce9dff","#c7e6c6","#e1cfc4","#fee89c","#b9ddd2","#b6c4de","#e9e6a9","#f2c2ae","#dba7ea","#91e7ee","#623131","#c4a2f5");
   lo_map[4] = new Array("olive", "red",    "#a8a8a8","#d1d1a5","#ffb0b0","#e6cece","#ffffb0","#ffd2a6","#60ff60","#88c4ff","#8e8eff","#9ecfcf","#95caff","#ffa4d1","#86d8ff","#aaaaff","#b9b9dd","#ffa2d0","#ff95ff","#c286ff","#aedaad","#d5baaa","#fee17e","#a9d6c8","#9cafd1","#e3df93","#eeb399","#cd87da","#6bdfe9","#ff0b0b","#12fc45");
   lo_map[5] = new Array("navy",  "blue",   "#919191","#c2c287","#ffa2a2","#debebe","#ffff95","#ffc68c","#17ff17","#66b3ff","#7777ff","#88c4c4","#71b8ff","#ff86c2","#55c8ff","#9393ff","#a6a6d2","#ff86c2","#ff6fff","#b062ff","#8cca8a","#c59e87","#fed74e","#89c7b5","#7a94c2","#dad570","#e99a78","#bf63cf","#48d8e3","#ffa244","#afafa3");
   lo_map[6] = new Array("purple","teal",   "#747474","#b1b165","#ff8e8e","#d7b0b0","#ffff75","#ffa346","#00f000","#359aff","#5353ff","#70b8b8","#4aa5ff","#ff53a9","#17b4ff","#7979ff","#8d8dc7","#ff68b4","#ff1eff","#a042ff","#6abd68","#ba8e74","#fdcb20","#71bba5","#617eb6","#d1cb4e","#e48358","#b143c5","#23d0de","#ade12f","#11ff54");
   lo_map[7] = new Array("gray",  "#076767","#616161","#a0a050","#ff6f6f","#c99292","#f0f000","#ff8e1e","#00d900","#0078f0","#1111ff","#51a2a2","#3399ff","#ff0f87","#0099e3","#5555ff","#7777bb","#ff3399","#e800e8","#850bff","#4faa4d","#ab7554","#d9a902","#5eb399","#4b6aa5","#b5ae2f","#de6632","#9733a8","#1eb9c6","#c3da45","#f3ff8c");
   lo_map[8] = new Array("yellow","#076767","#414141","#808040","#ff5b5b","#b56868","#b0b000","#dd6f00","#00ae00","#0066cc","#0000b5","#428282","#0b85ff","#c40062","#0077b0","#0b0bff","#5353a8","#ca0065","#b000b0","#6300c6","#418f3f","#8e6246","#b68d01","#499a82","#3a5381","#8c8724","#c15120","#732781","#17949d","#a600a6","#bfac54");
   */
   lo_map[0] = new Array("#ffffff",	"#fefefe","#fefefc","#fff7f7","#fefcfc","#fffff7","#fffaf4","#f7fff7","#f4faff","#f7f7ff","#fafcfc","#f7fbff","#fff4fa","#f4fcff","#f7f7ff","#fafafc","#fffbfd","#fff4ff","#f8f0ff","#f9fdf9","#fcfaf8","#fffdf4","#f5faf9","#f8f9fc","#fcfcf1","#fef8f5","#faf0fb","#f2fcfd","#00ff80","#a4fc22");
   lo_map[1] = new Array("#000000", "#e6e6e6","#fafaf3","#ffeeee","#f8efef","#ffffe8","#fff2e6","#e8ffe8","#dfefff","#e1e1ff","#eef7f7","#e6f2ff","#ffe8f3","#e6f7ff","#e8e8ff","#eeeef7","#ffe6f2","#ffdfff","#ebd7ff","#edf8ed","#f5efeb","#fff8dd","#e6f2ee","#dfe6f0","#f3f2d3","#fbebe8","#efdaf3","#d1f4f8","#4563c9","#af6cd3");
   lo_map[2] = new Array("#ff0000",	"#d7d7d7","#f0f0e1","#ffd7d7","#f2e6e6","#ffffd9","#ffe8d0","#d2ffd2","#cae4ff","#d2d2ff","#daeded","#cee7ff","#ffd8eb","#c8edff","#d2d2ff","#e1e1f0","#ffd2e9","#ffcaff","#ddbbff","#dff0df","#eee2db","#fef0c0","#cfe9e1","#ccd6e8","#eeecbd","#f7d9cc","#e4beeb","#b1eef3","#6a6a00","#ac67ff");
   lo_map[3] = new Array("#00ff00", "#c3c3c3","#e1e1c4","#ffbfbf","#eddcdc","#ffffca","#ffddbb","#97ff97","#acd6ff","#b3b3ff","#bddfdf","#b3d9ff","#ffbbdd","#b0e6ff","#c1c1ff","#cbcbe4","#ffbfdf","#ffb5ff","#ce9dff","#c7e6c6","#e1cfc4","#fee89c","#b9ddd2","#b6c4de","#e9e6a9","#f2c2ae","#dba7ea","#91e7ee","#623131","#c4a2f5");
   lo_map[4] = new Array("#0000ff", "#a8a8a8","#d1d1a5","#ffb0b0","#e6cece","#ffffb0","#ffd2a6","#60ff60","#88c4ff","#8e8eff","#9ecfcf","#95caff","#ffa4d1","#86d8ff","#aaaaff","#b9b9dd","#ffa2d0","#ff95ff","#c286ff","#aedaad","#d5baaa","#fee17e","#a9d6c8","#9cafd1","#e3df93","#eeb399","#cd87da","#6bdfe9","#ff0b0b","#12fc45");
   lo_map[5] = new Array("#076767", "#919191","#c2c287","#ffa2a2","#debebe","#ffff95","#ffc68c","#17ff17","#66b3ff","#7777ff","#88c4c4","#71b8ff","#ff86c2","#55c8ff","#9393ff","#a6a6d2","#ff86c2","#ff6fff","#b062ff","#8cca8a","#c59e87","#fed74e","#89c7b5","#7a94c2","#dad570","#e99a78","#bf63cf","#48d8e3","#ffa244","#afafa3");
   lo_map[6] = new Array("#076767", "#747474","#b1b165","#ff8e8e","#d7b0b0","#ffff75","#ffa346","#00f000","#359aff","#5353ff","#70b8b8","#4aa5ff","#ff53a9","#17b4ff","#7979ff","#8d8dc7","#ff68b4","#ff1eff","#a042ff","#6abd68","#ba8e74","#fdcb20","#71bba5","#617eb6","#d1cb4e","#e48358","#b143c5","#23d0de","#ade12f","#11ff54");
   lo_map[7] = new Array("#f0f0f0", "#616161","#a0a050","#ff6f6f","#c99292","#f0f000","#ff8e1e","#00d900","#0078f0","#1111ff","#51a2a2","#3399ff","#ff0f87","#0099e3","#5555ff","#7777bb","#ff3399","#e800e8","#850bff","#4faa4d","#ab7554","#d9a902","#5eb399","#4b6aa5","#b5ae2f","#de6632","#9733a8","#1eb9c6","#c3da45","#f3ff8c");
   lo_map[8] = new Array("#ffff00" ,"#414141","#808040","#ff5b5b","#b56868","#b0b000","#dd6f00","#00ae00","#0066cc","#0000b5","#428282","#0b85ff","#c40062","#0077b0","#0b0bff","#5353a8","#ca0065","#b000b0","#6300c6","#418f3f","#8e6246","#b68d01","#499a82","#3a5381","#8c8724","#c15120","#732781","#17949d","#a600a6","#bfac54");



   if(!document.all.div_color)
   {
      ls_html = "";
      ls_html = ls_html + "<div id='div_color' name='div_color' oncontextmenu='return false' ondragstart='return false' onselectstart='return false' style=\"background:buttonface; margin:5px; padding:5px;margin-top:2px;border-top:1px solid buttonshadow;border-left: 1px solid buttonshadow;border-right: 1px solid buttonshadow;border-bottom:1px solid buttonshadow;width:160px;display:none;position: absolute; z-index: 99; cursor:crosshair;\"><table border=0 cellpadding=1 cellspacing=1 width=250 bgcolor=black id=tbl_div_color><tr><td width=70 bgcolor=white align=center><p><font face=굴림체 size=2>현재색상</font></td>";
      ls_html = ls_html + "<td width=80 bgcolor='"+ls_color+"'></td>";
      ls_html = ls_html + "<td width=100 align=center><form name=frm_div_color method=get><input type=text name=txt_div_color maxlength=11 size=11 style=\"text-align:center\" /></td>";
      ls_html = ls_html + "</tr></table>";
      ls_html = ls_html + "<table border=0 cellpadding=0 cellspacing=1 width=420 height = 120 bgcolor=black>";

      for(i=0; i<9; i++)
      {
         ls_html = ls_html + "</tr><tr>";
         for(j=0; j<31; j++)
         {
            ls_html = ls_html + "<TD BGCOLOR=\""+lo_map[i][j]+"\" onMouseOver=fc_color_over('"+lo_map[i][j]+"') onClick=\"fc_color_click('"+lo_map[i][j]+"')\"><P></TD>";
         }
      }
      ls_html = ls_html + "</tr></table></div>";

      document.body.insertAdjacentHTML("beforeEnd", ls_html);
      //

   }

   //alert(lo_this.style.Top);
   //alert(lo_this.style.posLeft);

   document.all.div_color.style.pixelTop  = y+7;
   document.all.div_color.style.pixelLeft = x-50;
   document.all.div_color.style.display   = (document.all.div_color.style.display == "block") ? "none" : "block";

   // 해당 칼라 테이블의 두번째 셀의 색깔을 변경한다.
   tbl_div_color.rows[0].cells[1].style.backgroundColor=ls_color;

}

/*
' ------------------------------------------------------------------
' Function    : fc_color_over(ars_color)
' Description : 마우스가 over되면 색상을 동적으로 변경해준다.
' Argument    : String 변경할 Color
' Return      :
' ------------------------------------------------------------------
*/
function fc_color_over(ars_color)
{
   frm_div_color.txt_div_color.style.backgroundColor = ars_color;
}

/*
' ------------------------------------------------------------------
' Function    : fc_color_click(ars_color)
' Description : 마우스를 클릭하면 레이어를 감추고 해당색상을 호출한 버튼의 background-color로변경한다.
' Argument    : String 변경할 Color
' Return      :
' ------------------------------------------------------------------
*/
function fc_color_click(ars_color)
{
   document.all.div_color.style.display = "none";
   // 전역변수로 선언된 객체의 백그라운드 색깔을 변경한다.
   go_div_color.style.backgroundColor = ars_color;
}

/*
' ------------------------------------------------------------------
' Function    : fc_pre_load()
' Description : 이미지를 미리 불러올때 사용함 예제  body onload="fc_pre_load('a.gif','b.gif'...)"
' Argument    : 가변적으로 변한다.
' Return      :
' ------------------------------------------------------------------
*/
function fc_pre_load()
{
   if (!document.images) return;
   var lo_array = new Array();
   var lo_arguments = fc_pre_load.arguments; // 받은 아큐먼트수

   for (var i = 0; i < lo_arguments.length; i++)
   {
      lo_array[i] = new Image();
      lo_array[i].src = lo_arguments[i];
  }
}

/*
' --------------------------------------------------------------------------------------------------
' Function    : fc_hour_select(ars_hour)
' Description : 시간을 선택한다. 시간이 있으면 선택해준다.
' Argument    : String 시간
' Return      : String 옵션박스
' --------------------------------------------------------------------------------------------------
*/
function fc_hour_select(ars_hour)
{
   var i,ls_option,ls_hour;

   ls_option = "";

   for(i=0; i<=24; i++)
   {
      ls_hour = i < 10 ? "0"+i : i;

      // 시간이 동일하면
      if(ls_hour == ars_hour)
      {
         ls_option = ls_option + "<option value=\"" + ls_hour + "\" selected>" + ls_hour + "시</option>";
      }
      else
      {
         ls_option = ls_option + "<option value=\"" + ls_hour + "\">" + ls_hour + "시</option>";
      }
   }
   return ls_option;
}

/*
' --------------------------------------------------------------------------------------------------
' Function    : fc_minute_select(ars_minute)
' Description : 분을 선택한다. 분이 있으면 선택해준다.
' Argument    : String 분
' Return      : String 옵션박스
' --------------------------------------------------------------------------------------------------
*/
function fc_minute_select(ars_minute)
{
   var i,ls_option,ls_minute;

   ls_option = "";

   for(i=0; i<=59; i++)
   {
      ls_minute = i < 10 ? "0"+i : i;

      // 시간이 동일하면
      if(ls_minute == ars_minute)
      {
         ls_option = ls_option + "<option value=\"" + ls_minute + "\" selected>" + ls_minute + "분</option>";
      }
      else
      {
         ls_option = ls_option + "<option value=\"" + ls_minute + "\">" + ls_minute + "분</option>";
      }
   }
   return ls_option;
}

/*
' --------------------------------------------------------------------------------------------------
' Function    : fc_zip_search(ars_return1,ars_return2,ars_return3,ars_return4)
' Description : 우편번호 검색화면을 뛰운다.
' Argument    : String 우편번호1,String 우편번호2,String 주소,String 상세주소
' Return      :
' --------------------------------------------------------------------------------------------------
*/
function fc_zip_search(ars_return1,ars_return2,ars_return3,ars_return4)
{
	fc_zip_daum(ars_return1,ars_return2,ars_return3,ars_return4);
}
function fc_zip_daum(ars_return1,ars_return2,ars_return3,ars_return4)
{
  new daum.Postcode({
		oncomplete: function(data) {
			var fullRoadAddr = data.roadAddress;
			var extraRoadAddr = '';
			if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){ extraRoadAddr += data.bname; }
			if(data.buildingName !== '' && data.apartment === 'Y'){ extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName); }
			if(extraRoadAddr !== ''){ extraRoadAddr = '(' + extraRoadAddr + ')'; }
			if(fullRoadAddr !== ''){ fullRoadAddr += extraRoadAddr; }
			try {document.getElementById(ars_return1).value = data.zonecode;}catch(e){$('input[name=' + ars_return1 +']').val(data.zonecode);}
			try {document.getElementById(ars_return2).value = '';}catch(e){/*$('input[name=' + ars_return2 +']').val('');*/}
			try {document.getElementById(ars_return3).value = data.roadAddress;}catch(e){$('input[name=' + ars_return3 +']').val(data.roadAddress);}
			try {document.getElementById(ars_return4).focus();}catch(e){$('input[name=' + ars_return4 +']').focus();}
			try {document.getElementById(ars_return4).value = extraRoadAddr;document.getElementById(ars_return4).focus();}catch(e){$('input[name=' + ars_return4 +']').val(extraRoadAddr);$('input[name=' + ars_return4 +']').focus();}
		}
  }).open();
}

/*
' --------------------------------------------------------------------------------------------------
' Function    : fc_dong_check(aro_form)
' Description : 우편번호 검색시 검색어가 존재하지 않을 경우 체크
' Argument    : Object 폼
' Return      :
' --------------------------------------------------------------------------------------------------
*/
function fc_dong_check(aro_form)
{
  if (aro_form.txt_dong.value=="")
  {
    alert("찾을 동이 공백입니다. \n\n 확인하여 주세요.");
    aro_form.txt_dong.focus();
    return false;
  }
}

/*
' --------------------------------------------------------------------------------------------------
' Function    : fc_zip_send(ars_zipcode1,ars_zipcode2,ars_addr,ars_return1,ars_return2,ars_return3,ars_return4)
' Description : 호출한 곳으로 우편번호 및 상세주소를 전송하고 창을 닫는다.
' Argument    : Object 폼
' Return      :
' --------------------------------------------------------------------------------------------------
*/
function fc_zip_send(ars_zipcode1,ars_zipcode2,ars_addr,ars_return1,ars_return2,ars_return3,ars_return4)
{
  window.opener.document.getElementById(ars_return1).value = ars_zipcode1;
  window.opener.document.getElementById(ars_return2).value = ars_zipcode2;
  window.opener.document.getElementById(ars_return3).value = ars_addr;
  window.opener.document.getElementById(ars_return4).focus();

  self.close();
}


/*
' --------------------------------------------------------------------------------------------------
' Function    : fc_over_check(ars_table,ars_field,ars_value,ars_name,ars_string)
' Description : 해당테이블의 필드값이 중복되었는지 체크한다.
' Argument    : String 테이블명,필드,값,이름,리턴값
' Return      :
' --------------------------------------------------------------------------------------------------
*/
function fc_over_check(ars_table,ars_field,ars_value,ars_name,ars_string)
{
   var ls_arg= "";

   if(eval("document.all." + ars_name).value == "")
   {
      alert("[ " + ars_string + " ] 이(가) 공백입니다. \n\n 확인하여 주세요.");
      eval("document.all." + ars_name).focus();
   }
   else
   {
      ls_arg = ls_arg + gs_url_path + "/common/ac_overlap_check.asp";
      ls_arg = ls_arg + "?table=" + ars_table;
      ls_arg = ls_arg + "&field=" + ars_field;
      ls_arg = ls_arg + "&value=" + ars_value;
      ls_arg = ls_arg + "&name=" + ars_name;
      ls_arg = ls_arg + "&string=" + ars_string;
      j_dynamic.src = ls_arg;
      //fc_dynamic_chk(ls_arg);
   }
}


/*
' --------------------------------------------------------------------------------------------------
' Function    : fc_keycode()
' Description : 키코드를 확인할때 사용하는 함수
'               사용법 fc_keycode() 함수를 호출하면 해당창이 뜸..
' Argument    :
' Return      :
' --------------------------------------------------------------------------------------------------
*/
function fc_keycode()
{
   var ls_html = "";
   var lo_win;

   ls_html = ls_html + "<html>\n";
   ls_html = ls_html + "<head>\n";
   ls_html = ls_html + "<title>Press Any Key</title>\n";
   ls_html = ls_html + "</head>\n";
   ls_html = ls_html + "<body onkeydown=\"alert('The keyCode is ' + window.event.keyCode)\" style=\"font-family: verdana; font-size: 12px; background-color: buttonface; border: 0px; color: buttontext; text-align: center;\" scroll=\"no\">\n";
   ls_html = ls_html + "Press Any Key\n";
   ls_html = ls_html + "</body>\n";
   ls_html = ls_html + "<script>\n";
   ls_html = ls_html + "window.resizeTo(200,100);\n";
   ls_html = ls_html + "<\/script>\n";
   ls_html = ls_html + "</html>\n";

   lo_win = window.open("","win_keycode","width=200,height=100");

   lo_win.document.write(ls_html);
}

/*
' --------------------------------------------------------------------------------------------------
' Function    : fc_all_blur()
' Description : 클릭할때 자국을 없앤다.
' Argument    :
' Return      :
' --------------------------------------------------------------------------------------------------
*/
function fc_all_blur()
{
   try
   {
   	for (i = 0; i < document.links.length; i++) document.links[i].onfocus = document.links[i].blur;
   }
   catch (e)
   {
   }

}



/*
' --------------------------------------------------------------------------------------------------
' Function    : fc_get_x(aro_name)
' Description : 오브젝트의 x 위치를 알아낸다.
' Argument    : Object 이름
' Return      :
' --------------------------------------------------------------------------------------------------
*/
function fc_get_x(aro_name)
{
   return (!aro_name||aro_name==document.body) ? 0 : aro_name.offsetLeft + fc_get_x(aro_name.offsetParent);
}

/*
' --------------------------------------------------------------------------------------------------
' Function    : fc_get_y(aro_name)
' Description : 오브젝트의 y 위치를 알아낸다.
' Argument    : Object 이름
' Return      :
' --------------------------------------------------------------------------------------------------
*/
function fc_get_y(aro_name)
{
   return (!aro_name||aro_name==document.body) ? 0 : aro_name.offsetTop + fc_get_y(aro_name.offsetParent);
}

/*
' --------------------------------------------------------------------------------------------------
' Function    : fc_server_time()
' Description : 서버시간을 가져온다.
' Argument    :
' Return      :
' --------------------------------------------------------------------------------------------------
*/
function fc_server_time()
{
   // 새롭게 변경된 내용을 가지고 오기 위해서
   // random한 숫자를 생성해서 같이 넘겨준다.
   var ls_arg = Math.random();

   return fc_http_get(gs_url_path + "/common/ac_get_time.asp?arg=" + ls_arg);
}

/*
' --------------------------------------------------------------------------------------------------
' Function    : fc_http_get(ls_url)
' Description : xmlhttp를 이용한 데이터 가져오기
' Argument    : String 데이터를 가져올 url
' Return      :
' --------------------------------------------------------------------------------------------------
*/
function fc_http_get(ls_url)
{
   // --------------------------------------------------------------------------------------------------
   // Begin xmlhttp를 이용한 데이터 처리
   // 2003-12-02 구형진
   // xmlhttp를 이용하여 데이터를 실시간으로 처리한다.
   // --------------------------------------------------------------------------------------------------

   var lo_http = new ActiveXObject("MSXML2.XMLHTTP");
   lo_http.open("GET",ls_url,false);
   lo_http.setRequestHeader("Content-type:","text/html");
   //lo_http.setRequestHeader("Content-Encoding:","utf-8");
   //lo_http.setRequestHeader( "Content-type:", "application/x-www-form-urlencoded");
   lo_http.setRequestHeader("Content-Encoding:", "euc-kr");


   //lo_http.onreadystatechange = fc_http_complete;

   lo_http.send();

   if (lo_http.status > 200)
   {
      alert("200 Error");
      return false;
   }
   else
   {
      return lo_http.responseText;
   }
}

/*
' --------------------------------------------------------------------------------------------------
' Function    : fc_http_complete()
' Description : 데이터가 도착하면 데이터를 처리하는 함수
' Argument    :
' Return      :
' --------------------------------------------------------------------------------------------------
*/
function fc_http_complete()
{
   if (lo_http.readyState == 4)
   {
      lo_http.onreadystatechange = fc_http_noop;
      // 서버시간을 설정해준다.
      //return lo_http.responseText;
   }
}

/*
' --------------------------------------------------------------------------------------------------
' Function    : fc_http_noop()
' Description : flase값을 리턴한다.
' Argument    :
' Return      :
' --------------------------------------------------------------------------------------------------
*/
function fc_http_noop()
{
   return false;
}
// --------------------------------------------------------------------------------------------------
// End xmlhttp를 이용한 데이터 처리
// 2003-12-02 구형진
// xmlhttp를 이용하여 데이터를 실시간으로 처리한다.
// --------------------------------------------------------------------------------------------------

/*
' --------------------------------------------------------------------------------------------------
' Function    : fc_zero(ari_num)
' Description : 10보다 작을경우는 앞에 0을 붙여서 리턴한다.
' Argument    : Integer 변환할숫자
' Return      :
' --------------------------------------------------------------------------------------------------
*/
function fc_zero(ari_num)
{
   return (parseInt(ari_num) < 10) ? "0" + String(ari_num) : ari_num;
}

/*
' --------------------------------------------------------------------------------------------------
' Function    : fc_dynamic_chk(ars_url)
' Description : 동적으로 값을 반환하는 구문체크
' Argument    : String 체크할url
' Return      :
' --------------------------------------------------------------------------------------------------
*/
function fc_dynamic_chk(ars_url)
{

   var ls_html = "";

   ls_html += "<a href=\"" + ars_url + "\" title=\"\">" + ars_url + "</a><br><br>";
   ls_html += fc_http_get(ars_url);

   try
   {
      var lo_div_sql = document.getElementById("div_sql");
      lo_div_sql.innerHTML = ls_html;
   }
   catch(e)
   {
      document.body.insertAdjacentHTML("afterBegin","<div id=div_sql></div>");
      var lo_div_sql = document.getElementById("div_sql");
      lo_div_sql.innerHTML = ls_html;
   }
}


/*
' ------------------------------------------------------------------
' Function    : fc_chk_byte(aro_name)
' Description : 입력한 글자수를 체크
' Argument    : Object Name(글자수를 제한할 컨트롤)
' Return      :
' ------------------------------------------------------------------
*/
function fc_chk_byte(aro_name)
{

   var ls_str     = aro_name.value; // 이벤트가 일어난 컨트롤의 value 값
   var li_str_len = ls_str.length;  // 전체길이

   // 변수초기화
   var li_max      = 10; // 제한할 글자수 크기
   var i           = 0;  // for문에 사용
   var li_byte     = 0;  // 한글일경우는 2 그밗에는 1을 더함
   var li_len      = 0;  // substring하기 위해서 사용
   var ls_one_char = ""; // 한글자씩 검사한다
   var ls_str2     = ""; // 글자수를 초과하면 제한할수 글자전까지만 보여준다.

   for(i=0; i< li_str_len; i++)
   {
      // 한글자추출
      ls_one_char = ls_str.charAt(i);

      // 한글이면 2를 더한다.
      if (escape(ls_one_char).length > 4)
      {
         li_byte += 2;
      }
      // 그밗의 경우는 1을 더한다.
      else
      {
         li_byte++;
      }

      // 전체 크기가 li_max를 넘지않으면
      if(li_byte <= li_max)
      {
         li_len = i + 1;
      }
   }

   // 전체길이를 초과하면
   if(li_byte > li_max)
   {
      alert( li_max + " 이상의  글자를 입력할수 없습니다. \n 초과된 내용은 자동으로 삭제 됩니다. ");
      ls_str2 = ls_str.substr(0, li_len);
      aro_name.value = ls_str2;

   }
   aro_name.focus();
}

function fc_chk_byte2(ars_value,ari_length)
{

   var ls_str     = ars_value;
   var li_str_len = ls_str.length;  // 전체길이

   // 변수초기화
   var li_max      = ari_length; // 제한할 글자수 크기
   var i           = 0;  // for문에 사용
   var li_byte     = 0;  // 한글일경우는 2 그밗에는 1을 더함
   var li_len      = 0;  // substring하기 위해서 사용
   var ls_one_char = ""; // 한글자씩 검사한다
   var ls_str2     = ""; // 글자수를 초과하면 제한할수 글자전까지만 보여준다.

   for(i=0; i< li_str_len; i++)
   {
      // 한글자추출
      ls_one_char = ls_str.charAt(i);

      // 한글이면 2를 더한다.
      if (escape(ls_one_char).length > 4)
      {
         li_byte += 2;
      }
      // 그밗의 경우는 1을 더한다.
      else
      {
         li_byte++;
      }

      // 전체 크기가 li_max를 넘지않으면
      if(li_byte <= li_max)
      {
         li_len = i + 1;
      }
   }

   if(li_byte >= li_max)
   {
      return true;
   }
   else
   {
      return false;
   }
}

/*
' ------------------------------------------------------------------
' Function    : fc_ifr_resize()
' Description : iframe 크기가 resize될때 iframe의 widht와 height를 변경
' Argument    :
' Return      :
' ------------------------------------------------------------------
*/
function fc_ifr_resize()
{
   var lo_iframe   = ifr_resize.document.body;   // resize할 Iframe의 body를 지정
   var lo_iframe2  = document.all["ifr_resize"]; // Iframe 객체를 지정함

   // Iframe의 body의 scrollHeight와 scrollWidth를 받아서
   // Iframe을 resize한다.
   lo_iframe2.style.height = lo_iframe.scrollHeight + (lo_iframe.offsetHeight - lo_iframe.clientHeight);
   lo_iframe2.style.width  = lo_iframe.scrollWidth  + (lo_iframe.offsetWidth - lo_iframe.clientWidth);
}

/*
' ------------------------------------------------------------------
' Function    : fc_ifr_init()
' Description : parent의 fc_ifr_resize를 호출하여 현재 문서의 크기를 resize함
' Argument    :
' Return      :
' ------------------------------------------------------------------
*/
function fc_ifr_init()
{
   parent.fc_ifr_resize();
}


/*
' ------------------------------------------------------------------
' Function    : fc_top_mnu_control()
' Description : 현재URL과 비교후 디스플레이설정
' Argument    :
' Return      :
' ------------------------------------------------------------------
*/
function fc_top_mnu_control()
{
   try
   {
      var lo_mnu   = document.all.tbl_main_mnu;
      var lo_cells;

      for(j=0; j < lo_mnu.length; j++)
      {
         lo_cells = lo_mnu[j].rows[0].cells[0];

         // A 태그를 돌면서 현재URL과 동일하면 메뉴를 보여준다.
         for(i=0; i < lo_cells.children.length; i++)
         {
            if(document.URL.indexOf(lo_cells.children(i).href) != -1)
            {
               lo_cells.children(i).style.fontWeight ="bold";
               //lo_cells.children(i).style.color ="#0080C0";
               lo_mnu[j].style.display = "";
               break;
            }
         }
      }
   }
   catch(e)
   {}
}
/*
' ------------------------------------------------------------------
' Function    : fc_top_menu(ari_idx)
' Description : 메뉴의 디스플레이를 설정한다.
' Argument    :
' Return      :
' ------------------------------------------------------------------
*/
function fc_top_menu(ari_idx)
{
   var lo_main_mnu = document.all.tbl_main_mnu;

   for(i=0; i< lo_main_mnu.length; i++) lo_main_mnu[i].style.display = "none";

   lo_main_mnu[ari_idx].style.display = "";
}

function f_sub_mnu(ari_idx)
{
   var lo_main_mnu = document.all.div_menu;

   for(i=0; i< lo_main_mnu.length; i++) lo_main_mnu[i].style.display = "none";

   lo_main_mnu[ari_idx].style.display = "";
}
function f_go(ars_url)
{
   document.location.href = ars_url;
}

function f_over()
{
   var lo_this = window.event.srcElement;
   var ls_type = window.event.type;

   if(ls_type == "mouseover")
   {
      lo_this.bgColor = "#4A7DD6";
      lo_this.style.color="white";
   }
   else
   {
      lo_this.bgColor = "white";
      lo_this.style.color="black";
   }
}


/*
' ------------------------------------------------------------------
' Function    : fc_cur_url()
' Description : 현재URL을 반환하는 함수.
' Argument    :
' Return      :
' ------------------------------------------------------------------
*/
function fc_cur_url()
{
   var ls_domain  = "http://" + document.domain; // 도메인정보
   var ls_c_url   = document.URL.replace("#none","");    // URL 정보
   var lo_split   = ls_c_url.split("?");
   var ls_url     = lo_split[0].replace(ls_domain,"")
	ls_url			= ls_url.split("#");
	ls_url			= ls_url[0];

   var regExp = /(\d+)(\d{3})($|\..*)/;
	regExp = /^:(\d{2,4})+[\/]/;

	ls_url			= ls_url.replace(regExp,'/');

   return ls_url;
}

/*
' ------------------------------------------------------------------
' Function    : fc_split_data(ars_data)
' Description : 받은데이터를 이차원 배열에 넣어준다.
'               2번째 요소의 크기는 전역변수에 넣어준다.
'               gi_col_length
' Argument    :
' Return      : Array 2차원배열
' ------------------------------------------------------------------
*/
var gi_col_length = 0;

function fc_split_data(ars_data)
{
   var lo_row     = new Array;
   var lo_col     = new Array;
   var lo_return  = new Array;

   // row를 분리한다.
   lo_row = ars_data.split("\r");

   for(var i=0; i<lo_row.length; i++)
   {
      // col단위로 분리한다.
      lo_col = lo_row[i].split("\t");

      // 전역변수에 해당 col의 크기를 기억시킨다.
      if(i==0) gi_col_length = lo_col.length;

      lo_return[i] = new Array(lo_row.length);

      for(var j=0; j<lo_col.length; j++)
      {
         // 2차원 배열에 해당 내용을 넣어준다.
         lo_return[i][j] = lo_col[j];
      }
   }
   return lo_return;
}

/*
' -----------------------------------------------------------------------------
' Function    : fc_center_win(ars_url,ars_win_name,ari_width,ari_height)
' Description : 가운데 윈도우 열기
' CreateDate  : 2004-03-22
' Argument    :
' Return      :
' -----------------------------------------------------------------------------
*/
function fc_center_win(ars_url,ars_win_name,ari_width,ari_height)
{
   var li_width  = (screen.width  - ari_width)  / 2;
   var li_height = (screen.height - ari_height) / 2;
   var lo_win = window.open(ars_url,ars_win_name,'status=yes,menubar=0,locationbar=0,toolbar=0,scrollbars=auto,resizable=0,left='+li_width+',top='+li_height+',width='+ari_width+',height='+ari_height);

   return lo_win;
}

/*
' -----------------------------------------------------------------------------
' Function    : fc_center_win2(ars_url,ars_win_name,ari_width,ari_height)
' Description : 가운데 윈도우 열기(스크롤바)
' CreateDate  : 2004-03-22
' Argument    :
' Return      :
' -----------------------------------------------------------------------------
*/
function fc_center_win2(ars_url,ars_win_name,ari_width,ari_height)
{
   var li_width  = (screen.width  - ari_width)  / 2;
   var li_height = (screen.height - ari_height) / 2;
   var lo_win = window.open(ars_url,ars_win_name,'menubar=0,locationbar=0,toolbar=0,scrollbars=1,resizable=0,left='+li_width+',top='+li_height+',width='+ari_width+',height='+ari_height);

   return lo_win;
}

function fc_win_open(ars_url, ars_win_name, ars_win_option)
{
	//옵션을 받아서 새창열기
   var lo_win = window.open(ars_url, ars_win_name, ars_win_option);
}

// 2004-02-27 css를 설정한다.
// 간략한 설명을 보여준다.
function fc_tool_tip(ari_no)
{
   // 좌측위치
   var li_left = event.x - 200;

   // 상단위치
   var li_top = event.y - 10;

   var lo_div = eval("document.all.div_" + ari_no);

   // 보이면 안보이게
   if(lo_div.style.display == "")
   {
      lo_div.style.display = "none";
   }
   else
   {
      lo_div.style.left = li_left;
      lo_div.style.top = li_top;
      lo_div.style.display = "";
   }
}

function fc_tool_tip2(ari_no)
{
   // 좌측위치
   var li_left = event.x - 200;

   // 상단위치
   var li_top = event.y + 20;

   var lo_div = eval("document.all.div_" + ari_no);

   // 보이면 안보이게
   if(lo_div.style.display == "")
   {
      lo_div.style.display = "none";
   }
   else
   {
      lo_div.style.left = li_left;
      lo_div.style.top = li_top;
      lo_div.style.display = "";
   }
}
function fc_tool_tip3(ari_no)
{
   // 좌측위치
   var li_left = event.x - 300;

   // 상단위치
   var li_top = event.y + 10;

   var lo_div = eval("document.all.div_" + ari_no);

   // 보이면 안보이게
   if(lo_div.style.display == "")
   {
      lo_div.style.display = "none";
   }
   else
   {
      lo_div.style.left = li_left;
      lo_div.style.top = li_top;
      lo_div.style.display = "";
   }
}


function fc_tool_tip4(ari_no)
{
   var lo_this = window.event.srcElement;

   // 좌측위치
   var li_left = fc_get_x(lo_this) - 150;

   // 상단위치
   var li_top = fc_get_y(lo_this) + 10;

   var lo_div = eval("document.all.div_" + ari_no);

   // 보이면 안보이게
   if(lo_div.style.display == "")
   {
      lo_div.style.display = "none";
   }
   else
   {
      lo_div.style.left = li_left;
      lo_div.style.top = li_top;
      lo_div.style.display = "";
   }
}
/*
' ------------------------------------------------------------------
' Function    : fc_td_select(ari_num)
' Description : td부분을 선택한다.
' Argument    :
' Return      :
' ------------------------------------------------------------------
*/
function fc_td_select(ari_num,ars_mode)
{
   var lo_this  = window.event.srcElement;
   var lo_table = lo_this.parentNode.parentNode.parentNode.parentNode;
   var ls_text  = "";
   var lo_temp  = document.getElementById("div_temp");
   var li_x     = fc_get_x(lo_this);
   var li_y     = fc_get_y(lo_this);

   //alert(lo_this.rowIndex);

   var li_height  = 0;
   var li_width   = lo_table.rows[0].cells[ari_num].width;

   for(var i=1; i < lo_table.rows.length; i++)
   {
      if(i+1 > lo_table.rows.length)
      {
         ls_text += lo_table.rows[i].cells[ari_num].innerText;
      }
      else
      {
         ls_text += lo_table.rows[i].cells[ari_num].innerText + "\n";
      }

      li_height += 16;
   }

   if(!lo_temp)
   {
      document.body.insertAdjacentHTML("beforeEnd","<div id=\"div_temp\" style=\"position: absolute; z-index: 99;display:none;\"><textarea name=\"tar_temp\"></textarea></div>");
   }

   if(div_temp.style.display != "none")
   {
      div_temp.style.display = "none";
   }
   else
   {
      div_temp.style.display = "";
      div_temp.style.pixelLeft = li_x + 20;
      div_temp.style.pixelTop  = li_y + 25;

      var lo_tar_temp = document.all.tar_temp;

      lo_tar_temp.style.border = 0;
      lo_tar_temp.style.backgroundColor = "transparent"; // 배경을 투명하게
      lo_tar_temp.style.overflow = "hidden"; // 스크롤바를 없애기 위해서
      lo_tar_temp.style.width  = li_width;
      lo_tar_temp.style.height = li_height;

      lo_tar_temp.value = ls_text;

      lo_tar_temp.select();
      document.execCommand('copy'); // 복사명령
      setTimeout("document.body.removeChild(div_temp)",500);
      //div_temp.style.display = "none";
   }
}

/*
' -----------------------------------------------------------------------------
' Function    : fc_chk_all(arb_type,ars_list)
' Description : 리스트에서 체크박스를 선택한다.
' CreateDate  : 2004-04-20
' Argument    : arb_type --> 선택형태
'                            true = 선택,false = 선택해제, other=체크박스에서 선택
' Return      :
' -----------------------------------------------------------------------------
*/
function fc_chk_all(arb_type,ars_list)
{
   // 목록 테이블 지정
   var lo_table    = document.getElementById(ars_list);
   var lb_checked  = arb_type;

   // 체크박스에서 클릭하면 현재상태를 보고 변환해준다.
   if(lb_checked == "other")
   {
      //alert(lo_table.rows[0].cells[0].childNodes(0).checked);
      if(lo_table.rows[0].cells[0].childNodes(0).checked == true)
      {
         lb_checked = true;
      }
      else
      {
         lb_checked = false;
      }
   }

   var li_rows = lo_table.rows.length;
   var lo_child;

   // 체크박스 선택
   for(var i=0; i < li_rows; i++)
   {
      lo_child = lo_table.rows[i].cells[0].childNodes(0);

      lo_child.checked = lb_checked;
   }
}

/*
' ------------------------------------------------------------------
' Function    : fc_o_by(ars_ocolumn,ars_otype)
' Description : 현재폼에서 arg_ocolumn과 arg_otype의 값을 변경해서
'               Order By 구문을 변경한다.
' Argument    :
' Return      :
' ------------------------------------------------------------------
*/
function fc_o_by(ars_ocolumn,ars_otype,ars_form)
{
   var lo_form = eval("document.forms['" + ars_form + "']");

   try
   {
      lo_form.hid_ocolumn.value = ars_ocolumn;
      lo_form.hid_otype.value   = ars_otype;
   }
   catch(e)
   {
      lo_form.arg_ocolumn.value = ars_ocolumn;
      lo_form.arg_otype.value   = ars_otype;
   }
   lo_form.submit();
}


var go_function = new Array;

function fc_push(ars_text)
{

   go_function[parseFloat(go_function.length)+1] = ars_text;
}

function fc_pop()
{
   for(var i=0; i<go_function.length; i++)
   {
      if(go_function[i])
      {
         eval(go_function[i]);
      }
   }
}
// ----------------------------------------------------------
// 전체화면으로 열기
// ----------------------------------------------------------
function full_screen(strUrl,strWinName)
{
  var w_width = window.screen.width - 10;
  var w_height = window.screen.height - 53;

  window.open(strUrl, strWinName , "width=" + w_width + ",height=" + w_height + ",top=0,left=0");
}
/*
		2012-08-17	안용태
		TAB	text형 메뉴 롤오버 처리
				-	업데이트
					;	카테고리 게시판 연결시 셀렉트 하기	2012-09-07	cate
					;	/cwse/cwse2.php?cate=1	와 같은 href를 가져야 한다.
*/
function gfc_aTag_hover(ars_class){
	try
	{
		if(ars_class == '' || typeof ars_class == 'undefined') ars_class = '_aTag_hover';
		var ls_href = '';
		var ls_url  = '';
		var ls_cur_href = '';
		var ls_cate_no  = fc_querystring("cate");			//		게시판 카데고리에 따른 2차 메뉴 선택
		var ls_cur_url  = fc_cur_url();
		
		if(ls_cur_url) {
			ls_cur_href = ls_cur_url.split('?');
			ls_cur_href = ls_cur_href[0];
		}
		if(ls_cate_no != "") ls_cur_url = ls_cur_href + '?cate=' + ls_cate_no;

		$('.' + ars_class).each(function(){
			ls_href = $(this).find('a').eq(0).attr('href');
			$(this).click(function(){
				ls_url = $(this).find('a').eq(0).attr('href');
				document.location.href = ls_url;
			});
			if(ls_href == ls_cur_url) {
				$(this).addClass('_aTag_over');
			}
			else {
				$(this).hover(
					function(){
						$(this).addClass('_aTag_over');
					},
					function(){
						$(this).removeClass('_aTag_over');
					}
				);
			}
		});
	} catch (e) { }
}
// 2006-04-04 수정 FireFox에서 동작하도록
function m1(aro_obj)
{
   var lo_this = aro_obj;
   var lo_over = new Image();
   var ls_src  = lo_this.src;
   var ls_alt  = lo_this.alt;

   var ls_domain   = "http://" + document.domain;
   var ls_cur_url  = fc_cur_url();
   var lo_img      = null;
   var ls_board_id = fc_querystring("boardid");
   var ls_cate_no  = fc_querystring("CatNo");
	var ls_href		 = '';

   var ls_chg = "Y";

   try
   {
      var lo_parent   = aro_obj.parentNode;
      if(lo_parent.tagName == "A")
      {
			var regExp = /^:(\d{2,4})+[\/]/;
			ls_href	  = lo_parent.href.replace(ls_domain,"");
			ls_href	  = ls_href.replace(regExp,'/');

         if(ls_cate_no != "")
         {
            if((ls_cur_url+"?CatNo=" + ls_cate_no)== ls_href)
            {
               lo_parent.innerHTML = "<img src='" + lo_this.src.replace(/out/gi,"over") + "' alt='" + ls_alt + "' border='0' />";
               ls_chg = "N";
            }
         }
         else
         {
            if(ls_cur_url == ls_href)
            {
               lo_parent.innerHTML = "<img src='" + lo_this.src.replace(/out/gi,"over") + "' alt='" + ls_alt + "' border='0' />";
               ls_chg = "N";
            }
         }

      }

   } catch (e) {  }
	try{
		if(ls_chg == "Y")
		{
			lo_over.src = ls_src.replace(/out/gi,"over");

			lo_this.style.cursor = "pointer";
			lo_this.style.padding = 0;
			lo_this.style.margin = 0;

			lo_this.onmouseover = MoverImg;
			lo_this.onmouseout = MoutImg;


			function MoverImg()
			{
				lo_this.src = ls_src.replace(/out/gi,"over");
			}
			function MoutImg()
			{
				lo_this.src = ls_src.replace(/over/gi,"out");
			}
		}
	} catch (e) { }
}

function f_pview_photo(ars_url)
{
   window.open(ars_url,"win_pview","width=700,height=482,status=yes,left=0,top=0");
}


// Ie 설계변경에 따른 패치 2006-03-02
// s: source url
// d: flash id
// w: source width
// h: source height
// t: wmode ("" for none, transparent, opaque ...)
function FlashW(s,d,w,h,t)
{
   document.write("<object classid=\"clsid:d27cdb6e-ae6d-11cf-96b8-444553540000\" codebase=\"http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0\" width="+w+" height="+h+" id="+d+"><param name=wmode value="+t+" /><param name=movie value="+s+" /><param name=menu value=false /><param name=quality value=high /><embed src="+s+" quality=high wmode="+t+" type=\"application/x-shockwave-flash\" pluginspage=\"http://www.macromedia.com/shockwave/download/index.cgi?p1_prod_version=shockwaveflash\" width="+w+" height="+h+"></embed></object>");
}

// Iframe Resize ====
function getReSize()
{
       try {
              var objFrame = document.getElementById("ifrm");
              var objBody = ifrm.document.body;

              ifrmHeight = objBody.scrollHeight + (objBody.offsetHeight - objBody.clientHeight);

              if (ifrmHeight > 300) {
                     objFrame.style.height = ifrmHeight;
              } else {
                     objFrame.style.height = 300;
              }
              objFrame.style.width = '99%'
       } catch(e) {
       };
}

function getRetry()
{
       getReSize();
       setTimeout('getRetry()',500);
}

// 필드 미리 글써놓기
function ClearField(field){
   if (field.value == field.defaultValue) {
      field.value = "";
   }
}

function FillField(field){
   if (!field.value) {
      field.value = field.defaultValue;
   }
}

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

function f_print(ars_obj)
{
	var lo_div = document.getElementById(ars_obj);
	document.ifrm_print.document.getElementById("print").innerHTML = lo_div.innerHTML;
	ifrm_print.focus();
	ifrm_print.f_print();
}

//	무족건 대문자 onkeypress="fc_upperCase();"
function fc_upperCase()
{
	var event = window.event;
	if (event.keyCode >= 97 && event.keyCode <= 122)
	{
		event.keyCode = event.keyCode - 32;
	}
}

// skin_converter.php 에서 이동함. 같은곳에 3개의 함수가 있으나 다른 함수들은 php 코드와 섞여있어서 해당 함수만 이동함.
function f_board_img_resize()
{
   try
   {
      var lo_spn   = document.getElementById('spn_board_contents');
      var ls_str = lo_spn.innerHTML;
      var ls_new = ls_str.replace(/<img|<IMG(.+?)>/gi, "<img onload='f_board_img_resize2();'");

      lo_spn.innerHTML = ls_new;
   }
   catch(e)
   {}
}
//객체 왼쪽위치 반환
function f_offsetLeft(aro_obj) {
	var btn_left = 0;
	if(aro_obj.offsetParent){
		while(aro_obj.offsetParent){
			btn_left += aro_obj.offsetLeft;
			aro_obj = aro_obj.offsetParent;
		}
	} else if(lo_btn.x) {
		btn_left += aro_obj.x;
	}
	return btn_left;
}
//객체 왼쪽상단 반환
function f_offsetTop(aro_obj) {
	var btn_top = 0;
	if(aro_obj.offsetParent){
		while(aro_obj.offsetParent){
			btn_top += aro_obj.offsetTop;
			aro_obj = aro_obj.offsetParent;
		}
	} else if(lo_btn.x) {
		btn_top += aro_obj.x;
	}
	return btn_top;
}

function fc_banner_open() {
	//메인 배너창 열기
	var banner_win = window.open('banner_popup.php', 'banner_list', 'width=570, height=250, fullscreen=no, menubar=no, status=no,	toolbar=no, titlebar=no, location=no, scrollbars=yes');
}

function f_notice_tab(ari_idx)
{
	//메인 최근글 탭
	var i = 0;
	var lo_img  = null; //탭버튼
	var lo_div  = null; //각게시판 최근글 레이어
	var lo_link = new Array("첫번째는빈값", "/board/board2.php", "/board/board1.php"); //탭링크
	var lo_more = document.getElementById("notice_more"); // more 버튼

	lo_more.href = lo_link[ari_idx];

	for(i=1; i<=2; i++)
	{
		if (i == ari_idx) {
			lo_img = document.getElementById("img_n"+i);
			lo_img.src = lo_img.src.replace("_out","_over");

			lo_div = document.getElementById("div_n"+i);
			lo_div.style.display = "block";

		} else {
			lo_img = document.getElementById("img_n"+i);
			lo_img.src = lo_img.src.replace("_over","_out");

			lo_div = document.getElementById("div_n"+i);
			lo_div.style.display = "none";
		}
	}
}


function f_business_tab(ari_idx)
{
	//메인 최근글 탭
	var i = 0;
	var lo_img  = null; //탭버튼
	var lo_div  = null; //각게시판 최근글 레이어
	var lo_link = new Array("첫번째는빈값", "/busi/busi2.php", "/busi/busi2_2.php", "/busi/busi2_3.php", "/busi/busi2_4.php", "/busi/busi2_5.php", "/busi/busi2_6.php", "/busi/busi2_7.php"); //탭링크
	//var lo_more = document.getElementById("business_more"); // more 버튼

	//lo_more.href = lo_link[ari_idx];

	for(i=1; i<=7; i++)
	{
		if (i == ari_idx) {
			lo_img = document.getElementById("img_b"+i);
			lo_img.src = lo_img.src.replace("_out","_over");

			lo_div = document.getElementById("div_b"+i);
			lo_div.style.display = "block";

		} else {
			lo_img = document.getElementById("img_b"+i);
			lo_img.src = lo_img.src.replace("_over","_out");

			lo_div = document.getElementById("div_b"+i);
			lo_div.style.display = "none";
		}
	}
}

function setPng24(obj) { 
    obj.width=obj.height=1; 
    obj.className=obj.className.replace(/\bpng24\b/i,''); 
    obj.style.filter = 
    "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+ obj.src 

+"',sizingMethod='image');" 
    obj.src='';  
    return ''; 
} 



/*
		서브 메뉴 2단 선택 트리구조
		최원일		2012-08-08
		<dl id="smenu">
			<dt><img src="/images/sub_menu/tite.gif"/></dt>  
			<dd>
				<a href="/soge/soge1.php"><img src="/images/sub_menu/menu_01_out.gif" border="0" /></a>
				<ul>
					<li><a href='/soge/soge1.php'><img src="../images/sub_menu/menu1-1_out.gif" width="180" height="20" border="0" alt=""  ></a></li>
					<li><a href='/soge/soge1_2.php'><img src="../images/sub_menu/menu1-2_out.gif" width="180" height="20" border="0" alt=""  ></a></li>
				</ul>
			</dd>
		</dl>
		3단계 주소는 /soge/soge1_2_1.php /soge/soge1_2_2.php
*/
function gfc_selectMenu(ars_objId){
	var $lo_menu		= $(ars_objId);
	var ls_cur_url		= fc_cur_url();
	var lo_url			= ls_cur_url.split(".");
	var ls_menuId		= lo_url[0].split("_");
	var $lo_href		= null;
	var $lo_src			= null;
	var ls_href			= null;
	var ls_src			= null;
	var ls_num			= '';
	var $lo_menuSub	= null;
	var ls_hrefSub		= '';
	var ls_numString  = '';
	var li_now			= 0;
	var ls_hrefSub2	= '';
	var lo_sub_url		= '';

	ls_menuId = ls_menuId[0];
	if(ls_menuId) ls_menuId = ls_menuId.substring(ls_menuId.length - 2, ls_menuId.length);

	if(ls_menuId) {
		try{
			for(var i=0; i < ls_menuId.length; i++){
				ls_numString = Number(  ls_menuId.charAt(i)  );
				if(!isNaN(ls_numString)) ls_num = String(ls_numString);
			}
		} catch (e) { }
	}

	$lo_menu.find('dd').each(function(e){
		$(this).find('ul').hide();
		$lo_href = $(this).find('a').eq(0);
		$lo_src  = $(this).find('a img').eq(0);
		ls_src   = $lo_src.attr('src');
		li_now	= e + 1;

		if(Number(ls_num) == li_now ){
			gfc_imgOver($lo_src, 1);
			$lo_menuSub = $(this).find('ul');
			$lo_menuSub
				.show()
				.find('li').each(function(){
					ls_hrefSub = $(this).find('a').eq(0).attr('href');
					if(ls_hrefSub == ls_cur_url) {
						gfc_imgOver( $(this).find('a img') , 1);
					}
					else {
						/*
								3단계이미지가 맞는지 확인 한다.
						*/
						lo_sub_url = ls_cur_url.split('.');
						lo_sub_url = lo_sub_url[0].split('_');

						if(lo_sub_url.length > 2){
							if(lo_sub_url[1] == '1'){
								ls_hrefSub2 = lo_sub_url[0] + '.php';
							}
							else {
								ls_hrefSub2 = lo_sub_url[0] + '_' + lo_sub_url[1] + '.php';
							}
							if(ls_hrefSub == ls_hrefSub2) {
								gfc_imgOver( $(this).find('a img') , 1);
							}
							else {
								$(this).find('a img').eq(0).hover(
									function(){ gfc_imgOver( $(this), 1); },
									function(){ gfc_imgOver( $(this), 0); }
								);
							}
						}
						else {
							$(this).find('a img').eq(0).hover(
								function(){ gfc_imgOver( $(this), 1); },
								function(){ gfc_imgOver( $(this), 0); }
							);
						}
					}							
			});
		}
		else {
			$(this).find('img').eq(0).hover(
				function(){ gfc_imgOver( $(this), 1); },
				function(){ gfc_imgOver( $(this), 0); }
			);
		}
	});
}
/*
		이미지 롤오버 처리
*/
function gfc_imgOver(ars_id, ars_mode){
	try
	{
		var $lo_img = $(ars_id);
		var ls_src  = $lo_img.attr('src');
		if(ars_mode) ls_src = ls_src.replace(/out/gi,"over");
		else ls_src = ls_src.replace(/over/gi,"out");
		$lo_img.attr('src', ls_src);
	} catch (e) { }
}

/*
		2012-08-10	안용태
		게시물 복사
*/
function f_all_copy(ars_boardId)
{
	try
	{
		var ls_str = '';
		$('input[name=chk_board_list]').each(function(e){
			if($(this).is(':checked')) {
				if(ls_str) ls_str += '_T_';
				ls_str += $(this).val();
			}
		});
		if(ls_str == '') {
			alert('복사 할 게시물을 선택하세요.');
			return false;
		}
		var ls_moveBoardId = $("#sbx_boardid_list option:selected").val();

		if(ls_moveBoardId) {
			$.ajax({
				type: 'GET',
				url: '/wt_board/common/ajax.html_utf8.php',
				data: {
					actions:		 'copyBoard',
					ars_str:		 ls_str,
					ars_no:		 ls_moveBoardId,
					ars_boardid: ars_boardId
				},
				dataType: "text",	//	json
				beforeSend: function(xmlHttpRequest) { },
				success: function(data) {
					alert('게시물을 복사하였습니다.');
				 },
				error: function(xmlHttpRequest, textStatus, errorThrown) { }
			});
		}
	}
	catch (e) { }
}
/*
		게시판정보의 게시판 리스트
*/
function f_boardid_select()
{
	try
	{
		$.ajax({
			type: 'GET',
			url: '/wt_board/common/ajax.html_utf8.php',
			data: {
				actions:	'selectBoardList'
			},
			dataType: "text",	//	json
			beforeSend: function(xmlHttpRequest) { },
			success: function(data) {
				$('#sbx_boardid_list').html(data);
			 },
			error: function(xmlHttpRequest, textStatus, errorThrown) { }
		});
	} catch (e) {}
}
/*
		동영상파일 삭제
*/
function gfc_deleteMultBoardFile(ars_no)
{
	try
	{
		$.ajax({
			type: 'GET',
			url: '/wt_board/common/ajax.html_utf8.php',
			data: {
				actions:	'deleteMultBoardFile',
				ars_no: ars_no
			},
			dataType: "json",	//	json
			beforeSend: function(xmlHttpRequest) { },
			success: function(data) {
				alert(data.message);
				if(data.result == '1') $('#_deleteMultBoardFile_' + ars_no).hide();
			 },
			error: function(xmlHttpRequest, textStatus, errorThrown) { }
		});
	} catch (e) { alert(e);}
}

/*
		지정자리 반올림 (값, 자릿수)	
*/
function Round(n, pos) {
	var digits = Math.pow(10, pos);
	var sign = 1;
	if (n < 0) {
		sign = -1;
	}
	// 음수이면 양수처리후 반올림 한 후 다시 음수처리
	n = n * sign;
	var num = Math.round(n * digits) / digits;
	num = num * sign;
	return num.toFixed(pos);
}
/*
		지정자리 버림 (값, 자릿수)
*/
function Floor(n, pos) {
	var digits = Math.pow(10, pos);
	var num = Math.floor(n * digits) / digits;
	return num.toFixed(pos);
}
/*
		지정자리 올림 (값, 자릿수)
*/
function Ceiling(n, pos) {
	var digits = Math.pow(10, pos);
	var num = Math.ceil(n * digits) / digits;
	return num.toFixed(pos);
}

/*
			로딩 스크립트	Start
*/
function gfc_loading(aro_obj) {
	try {
		var spinner = new Spinner().spin();
		var li_h = 45; 
		var li_w = 45;
		var left = 0;
		var top  = 0;
		var lo_size			= null;
		var left_load		= 0;
		var top_load		= 0;
		//var background		= 'rgba(136, 136, 136, .75)';
		var background		= '#888888'; 
		var position		= 'absolute';
		var $lo_loadDiv	= $('#loadingImg');
		var $layerFullBox = $('#layerFullBox');

		if(aro_obj) {
			lo_size = $(aro_obj).position();
			left_load = lo_size.left + 20;
			top_load = lo_size.top + 20;
			position = 'fixed';
		}
		else {
			li_h = $(document).height(); 
			li_w = $(document).width();
			left_load	= ( $(window).scrollLeft() + ($(window).width()) / 2 );
			top_load		= ( $(window).scrollTop() + ($(window).height()) / 2 );
			$layerFullBox.css({'background': background, 'width': li_w, 'height': li_h, 'left': left,'top': top, 'position':'absolute', 'z-index':'99000'});
		}
		$layerFullBox.show().animate({opacity:0.75}).keydown(function(event){ if(event.keyCode == 116) { return false; } });			//	F5 새로고침 막음
		$lo_loadDiv.css({'left':left_load,'top':top_load, 'position': position, 'z-index':'99001'});
		$layerFullBox.append($lo_loadDiv);
		$lo_loadDiv.append(spinner.el);
		$lo_loadDiv.find('#loadingImg_alertTxt').html(null);
		$lo_loadDiv.append('<span id="loadingImg_alertTxt"></span>');
		vi_loadState = 1;
		$(window).resize(function(){
			if(vi_loadState == 1) $layerFullBox.css({'width': $(document).width() + 'px', 'height': $(document).height() + 'px'});
		});
	} catch (e) { }
}
/*
			로딩 스크립트 Stop
*/
function gfc_loadingHide() {
	try {
		$('#layerFullBox').hide().keydown(function(event){if(event.keyCode == 116) { return true;} });
		if(event.keyCode == 116) { return true; }
		vi_loadState = 0;
		vi_popMsg++;
	} catch (e) {}
}
/*
		각종 ajax HTML 불려오기		
*/
function gfc_viewConfig(aro_obj, ars_actions, ars_no, ari_w, ari_h, ars_etc2, ars_uid) {
	var vi_screenX		= $(window).attr('screen').width;
	var vi_screenY		= $(window).attr('screen').height;
	try {
		var lo_size = $('#' + aro_obj).position();
		var li_left = lo_size.left;
		var li_top  = lo_size.top;
		li_top = li_top - 400;
	} catch (e) { 
		var li_left = Floor(vi_screenX / 2,0) - 200;
		var li_top = Floor(vi_screenY / 2,0) - 10;
	}
	if(ari_w) li_left = ari_w;			//	강제 왼족 지정
	if(ari_h) li_top = ari_h;			// 강제 높이 지정
	gfc_loading();

	var background		= 'rgba(170, 170, 170, .75)';
	$('#div_hidden').load("/wt_board/common/ajax.html_utf8.php?actions=" + ars_actions + "&ars_no=" + ars_no)
		.css({'left': li_left + 'px', 'top': li_top + 'px', 'background': background, 'z-index':99002 }).show('fast',
		function(){ gfc_closeHidden(); })
		.drag(function( ev, dd ){		/*		드레그 처리		*/
			$( this ).css({
				top: dd.offsetY,
				left: dd.offsetX
			});
		},{ handle:".ajax_tle_wrap" }).show('fast',function(){ gfc_closeHidden();});		   
}
/*
		hidden 레이어 닫기 클릭시		
*/
function gfc_closeHidden(){
	$('#div_hidden #layerPop_close').click(function(){ gfc_closeHiddenAuto(); });
}
/*		
		hidden 레이어 닫기 이벤트	
*/
function gfc_closeHiddenAuto(){
	$('#div_hidden').html(null).hide();
	gfc_loadingHide();
}
/*		
		본문내용프린트
*/
function prinPopUp() {
	var lo_win = window.open('/printPopUp.php', 'win_printPopUp', 'status=no, menubar=no, locationbar=no, toolbar=no, scrollbars=yes, resizable=no, left=0, top=0, width=850, height=700');
}

function gfc_board_cate_view(){
	$('._board_cate_view').each(function(){
		$(this).hover(
			function(){
				$(this).find('div').eq(0).show();
			},
			function(){
				$(this).find('div').eq(0).hide();
			}
		);
	});
}