
$(document).ready(function()
{
    // HIDE DIVS ON LOAD 
      $("#MatchResults").hide();
       $("#MatchResults1").hide();
        $("#MatchResults2").hide();
         $("#Show_Table").hide();
      
    var Fixtures = [];
    var Teams = ["Ireland","Italy","Brazil","Russia"];
	
               getAjaxData();


 ///////////////////////////////////////////////////////////////////////////////////////////////////////////
              
		function getAjaxData()
	{
	  if (window.XMLHttpRequest)
	  {
		// IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	  }
	  else
	  {
		// IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	  }
	  
	}		



///////////////////////////////////////////////////////////////////////////////////////////////////////////




     // CREATE FIXTURES
    function createFixtureList(Fixtures, display_results) {

        for (var i = 0; i < y - 1; i++) {
            var div = document.getElementById(display_results ? 'results' : 'fix');
            div.innerHTML += 'Round ' + (i + 1);
            // CREATE UL LIST
            var list = document.createElement('ul');
            for (var j = 0; j < y / 2; j++) {
                // CREATE LI LIST
                var item = document.createElement('li');
                var team1 = Fixtures[j + i * y / 2].team1;
                var team2 = Fixtures[j + i * y / 2].team2;
                if (display_results) {
                    team1 += '   ' + Fixtures[j + i * y / 2].score1 + '  ';
                    team2 += '   ' + Fixtures[j + i * y / 2].score2 + '  ';
                }
                item.appendChild(document.createTextNode(team1 + "   v   " + team2));

                // ADD TO LIST
                list.appendChild(item);

            }

            //ADD TO HTML
            div.appendChild(list);
            
        }
    }


///////////////////////////////////////////////////////////////////////////////////////////////////////////




    $("#gen").ready(function(){
	     $("#textboxes :text").each(function(){
            var contain = $(this).val();           
            Teams.push(contain);
	$(this).prop("disabled",true);
        });
        window.y =Teams.length;
        for (var j = 0 ; j < y -1; j++)
        {
            for (var i = 0; i < Teams.length /2; i++)
            {
                var fixture = {team1: Teams[i], team2: Teams[y - (i + 1)], score1: Math.floor(Math.random() * 5), score2: Math.floor(Math.random() * 5)};
                console.log(Fixtures);
                Fixtures.push(fixture);
            }
            
        }

    });


///////////////////////////////////////////////////////////////////////////////////////////////////////////


    $('#show_results').click(function() 
    { 
        createFixtureList(Fixtures, true);
	    $('#show_results').hide();
        $("#Show_Table, #MatchResults").slideToggle("slow");
    });


///////////////////////////////////////////////////////////////////////////////////////////////////////////


    function calculate_scores(teams, fixtures) {
        var scores = {};
        $.each(teams, function(i, team) {
            scores[team] = {wins: 0, losses: 0, draws: 0};
        });
        $.each(fixtures, function(i, fixture) {
            if (fixture.score1 > fixture.score2) {
                scores[fixture.team1].wins++;
                scores[fixture.team2].losses++;
            } else if (fixture.score1 < fixture.score2) {
                scores[fixture.team1].losses++;
                scores[fixture.team2].wins++;
            } else {
                scores[fixture.team1].draws++;
                scores[fixture.team2].draws++;
		    
            }
        });
        return scores;
    }


///////////////////////////////////////////////////////////////////////////////////////////////////////////



    function final_score(score) {
        return score.wins * 3 + score.draws;
    }


///////////////////////////////////////////////////////////////////////////////////////////////////////////

    $('#Show_Table').click(function() {
         $("#MatchResults2, #MatchResults1 ").slideToggle("slow");
          $('#Show_Table').hide();
        var scores = calculate_scores(Teams, Fixtures);
        var teams_in_order = Teams.concat().sort(function(team1, team2)
	    {
            return final_score(scores[team2]) - final_score(scores[team1]);
        });
        $.each(teams_in_order, function(i, team) {
            $('#scores_table tr:last').after($('<tr>')
                    .append($('<td>').append(document.createTextNode(team)))
                    .append($('<td>').append(document.createTextNode(scores[team].wins)))
                    .append($('<td>').append(document.createTextNode(scores[team].draws)))
                    .append($('<td>').append(document.createTextNode(scores[team].losses)))
                    .append($('<td>').append(document.createTextNode(final_score(scores[team]))))
            );
        });
    });

});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





