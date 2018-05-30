const approveMessagePanel = document.querySelector('.approve-category-panel');
const declineMessagePanel = document.querySelector('.decline-category-panel');
const requestDetailsBox = document.querySelector('.details-container');
approveMessagePanel.style.display = 'none';
declineMessagePanel.style.display = 'none'

function approvePanelShow() {

  approveMessagePanel.style.display = 'block';
  requestDetailsBox.style.display = 'none';

}

function approveResolvePanelShow() {

  approveMessagePanel.style.display = 'block';
  requestDetailsBox.style.display = 'none';

}

function declinePanelShow() {

  declineMessagePanel.style.display = 'block';
  requestDetailsBox.style.display = 'none';

}

function updateRequest() {

  approveMessagePanel.style.display = 'block';
  requestDetailsBox.style.display = 'none';

}

function createRequest() {

  approveMessagePanel.style.display = 'block';
  requestDetailsBox.style.display = 'none';

}



// Javascript filtering of request table
function myFilterTableFunction() {
  let input, filter, table, tr, td, i;
  searchFilterInput = document.getElementById("myfilter");
  filter = searchFilterInput.value.toUpperCase();
  requestTable = document.getElementById("request-table");
  tr = requestTable.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    byRequesterName = tr[i].getElementsByTagName("td")[1];
    byRequestId = tr[i].getElementsByTagName("td")[2];
    byTitle = tr[i].getElementsByTagName("td")[3];
    byDescription = tr[i].getElementsByTagName("td")[4];
    byPriority = tr[i].getElementsByTagName("td")[6];
    if (byRequesterName || byRequestId || byTitle || byDescription || byPriority) {
      if (byRequesterName.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      }
      else if (byRequestId.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      }
      else if (byTitle.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      }
      else if (byDescription.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      }
      else if (byPriority.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      }
      else {
        tr[i].style.display = "none";
      }
    }




  }
}


