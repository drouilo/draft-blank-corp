
var cpt = 0;
var cpt_pick = 0;
var cpt_ban = 0;
var pick = [false, false, true, true, false, false, false, true, true, false, true, true];
var team = [1,2,1,2,1,2,1,2,1,2,1,2];
var undo = new Array();
var redoIndex = 0;
var undoPositions = [];

window.onload = () => {
  $('#main').fadeIn(300);
  $('#spinner').fadeOut(20);
}

function myclick(perso){
    var currentPosition;
    var currentPick;
    var currentBan;
    if(undoPositions.length > 0){
      currentPosition = undoPositions[0];
      undo[currentPosition] = perso;
      undoPositions.shift();
      currentPick = getPickPosition(currentPosition);
      currentBan = getBanPosition(currentPosition);
    }else{
      if(cpt >= pick.length){
        return;
      }
      undo.push(perso);
      currentPosition = cpt;
      currentBan = cpt_ban;
      currentPick = cpt_pick;
      $("#fleches").children().eq(cpt).css("opacity", 0.2);
      cpt++;
    }
    var id = perso.attributes["id"].value;
    $("#back").prop('disabled', false);
    if(pick[currentPosition]){
        $("#img_pick"+currentPick).fadeOut(0, function(){
            $("#img_pick"+currentPick).attr('src', id+'_carte.jpg');
          }).fadeIn(300);
        $("#"+id+" .pick-img").hide().fadeIn(600);
        cpt_pick++;
    }else{
        $("#"+id+" .ban-img").fadeIn(300);
        $("#img_ban"+currentBan).attr('src', id+'_ban.jpg');
        cpt_ban++;
    }

    /*if(cpt >= pick.length){
      $("#pillier div, #sous-pillier div, #erodeur div").css("cursor", "default");
      $("#pillier div, #sous-pillier div, #erodeur div").attr("onclick", "");
      $("#pillier div, #sous-pillier div, #erodeur div").css("opacity", "0.5");
      $("#back img").css('cursor', 'default');
      $("#back img").css('opacity', '0.5');
      $("#classes h3").css('opacity', '0.5');
      $("#back").css("cursor", "default");
      $("#back").css("opacity", "0.5");
      $("#back").prop("disabled", true);
    }*/
    if(cpt == 1){
      $("#reset").css("cursor", "pointer");
      $("#back").css("cursor", "pointer");
      $("#reset").css("opacity", "1");
      $("#back").css("opacity", "1");
      $("#back").prop('disabled', false);
      $("#reset").prop('disabled', false);
    }
    perso.setAttribute("onclick", "reClick(this);");
}

function reClick(perso){
  // Get the index of the character click
  const indexPerso = undo.indexOf(perso);
  undoPositions.push(indexPerso);
  var id = perso.attributes["id"].value;
  if(pick[indexPerso]){
    const pickPosition = getPickPosition(indexPerso);
    $("#img_pick"+pickPosition).fadeOut(0, function(){
        $("#img_pick"+pickPosition).attr('src', 'cache.png');
      }).fadeIn(300);
      $("#"+id+" .pick-img").hide().fadeOut(600);
      cpt_pick--;
  }else{
    const banPosition = getBanPosition(indexPerso);
    $("#img_ban"+banPosition).attr('src', 'basic_ban.png');
    $("#"+id+" .ban-img").hide().fadeOut(600);
    cpt_ban--;
  }
  perso.setAttribute("onclick", "myclick(this);");
};

function getPickPosition(index){
    switch (index) {
      case 2:
        return 0;
        break;
      case 3:
        return 1;
        break;
      case 7:
        return 2;
        break;
      case 8:
        return 3;
        break;
      case 10:
        return 4;
        break;
      case 11:
        return 5;
        break;
      default:
        return -1;
    }
}

function getBanPosition(index){
  switch (index) {
    case 0:
      return 0;
      break;
    case 1:
      return 1;
      break;
    case 4:
      return 2;
      break;
    case 5:
      return 3;
      break;
    case 6:
      return 4;
      break;
    case 9:
      return 5;
      break;
    default:
      return -1;
    }
}

function back(){
    cpt--;
    $("#fleches").children().eq(cpt).css("opacity", 1);
    if(cpt == 0){
        $("#back").prop('disabled', true);
        $("#reset").prop('disabled', true);
        $("#reset").css("cursor", "default");
        $("#back").css("cursor", "default");
        $("#reset").css("opacity", "0.5");
        $("#back").css("opacity", "0.5");
    }
    var indice = undo.length -1;
    var id = undo[indice].attributes["id"].value;
    $("#"+id).attr("onclick", "myclick(this);");
    undo.splice(indice, 1);
    if(pick[cpt]){
        cpt_pick--;
        $("#"+id+" .pick-img").fadeOut(300);
        $("#img_pick"+cpt_pick).attr('src', 'cache.png');

    }else{
        $("#"+id+" .ban-img").fadeOut(300);
        cpt_ban--;
        $("#img_ban"+cpt_ban).attr('src', 'basic_ban.png');
    }
}

function reset(){
    cpt=0;
    cpt_ban =0;
    cpt_pick=0;
    undoPositions = [];
    undo = [];

    $("#pillier div, #sous-pillier div, #erodeur div").css("cursor", "pointer");
    $("#pillier div, #sous-pillier div, #erodeur div").attr("onclick", "myclick(this);");
    $("#pillier div, #sous-pillier div, #erodeur div").css("opacity", "1");
    $("#back").prop('disabled', false);

    $("#back img").css('cursor', 'pointer');
    $("#back img").css('opacity', '1');
    $("#classes h3").css('opacity', '1');

    $(".pick-img").fadeOut(300);
    $(".ban-img").fadeOut(300);

    $("#fleches img").css("opacity", "1");

    $("#reset").css("cursor", "default");
    $("#back").css("cursor", "default");
    $("#reset").css("opacity", "0.5");
    $("#back").css("opacity", "0.5");


    for (var i = 0; i < 8; i++) {
      $("#img_ban"+i).attr('src', 'basic_ban.png');
    }
    for (var i = 0; i < 6; i++) {
      $("#img_pick"+i).attr('src', 'cache.png');
    }
}