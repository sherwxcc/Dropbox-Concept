$("#file-upload").change(() => {
  $("#upload-spec-detail").empty();
  var selectedFileName = $("#file-upload")[0].files[0].name;
  var selectedFileSize = $("#file-upload")[0].files[0].size;
  var selectedFileType = $("#file-upload")[0].files[0].type;
  $("#upload-spec-detail").append(`
    <p>
    File Name: ${selectedFileName} <br>
    File Size: ${Math.round(selectedFileSize / 1024)}kb <br>
    File Type: ${selectedFileType}
    <p>
    `);
  $("button[name='submit']").removeAttr("disabled");
});

$("#upload-form").submit(() => {
  alert("Submit Successful!");
});

$(function () {
  $.get("/fileData").done((files) => {
    for (let i = 0; i < files.length; i++) {
      $(".list-group").append(
        `<p class="list-group-item list-group-item-action">${files[i]}
        <span class="dl-del-btn-group">
        <a href="./file/${files[i]}" id="download-btn" class="badge">Download</a>
        <a href="/delete/${files[i]}" id="delete-btn" class="badge">Delete</a>
        </span>
        </p>`
      );
    }
  });
});
