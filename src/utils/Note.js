import axios from "axios";
import Swal from "sweetalert2";

// *=========> ADD NOTE
// ^[1] show modal [title, content]
export function showAddModal({ token, updater }) {
  Swal.fire({
    title: "Add Note 💜",
    html: `
    <input type="text" placeholder="Enter a Title" id="title" name="title" class="form-control"/>
    <textarea type="text" placeholder="Enter a Description" id="content" name="content" class="form-control mt-3"></textarea>
    `,
    showCancelButton: true,
    confirmButtonText: "Add",
    showLoaderOnConfirm: true,

    preConfirm: () => {
      const title = document.getElementById("title").value;
      const content = document.getElementById("content").value;
      return { title, content };
    },

    allowOutsideClick: () => !Swal.isLoading(),
  }).then((result) => {
    console.log(result); // {title: "route", content: "academy"}
    sendDataToAddNote({
      title: result.value.title,
      content: result.value.content,
      token,
      updater,
    });
  });
}

// ^[2] send data from inputs to API
async function sendDataToAddNote({ title, content, token, updater }) {
  const { data } = await axios.post(
    "https://note-sigma-black.vercel.app/api/v1/notes",
    { title, content },
    {
      headers: {
        token,
      },
    }
  );

  if (data.msg === "done") {
    getAllNotes({ token, updater });
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your Note has been added",
      showConfirmButton: false,
      timer: 1500,
    });
  }
}

// ^[3] show Notes after addition [GET NOTES]
export async function getAllNotes({ token, updater }) {
  try {
    const { data } = await axios.get(
      "https://note-sigma-black.vercel.app/api/v1/notes",
      {
        headers: {
          token,
        },
      }
    );
    updater(data.notes);
  } catch (error) {
    updater([]);
  }
}

// !==================> Delete NOTE
// ^[1] show Modal
export function showDeleteModal({ noteID, token, updater }) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      sendDataToDelete({ noteID, token, updater });
    }
  });
}
// ^[2] send Data To Delete
async function sendDataToDelete({ noteID, token, updater }) {
  const { data } = await axios.delete(
    `https://note-sigma-black.vercel.app/api/v1/notes/${noteID}`,
    { headers: { token } }
  );

  getAllNotes({ token, updater });
  Swal.fire("Deleted!", "Your Note has been deleted.", "success");
  // ^[3] get Notes after delete
}

// ?==================> Update NOTE
// *[1] show update modal [get data from inputs]
export function showUpdatemodal({
  prevTitle,
  prevContent,
  noteID,
  token,
  updater,
}) {
  Swal.fire({
    title: "Update Note 😁",
    html: `
    <input type="text" placeholder="Enter a Title" id="title" name="title" class="form-control" value="${prevTitle}"/>
    <textarea type="text" placeholder="Enter a Description" id="content" name="content" class="form-control mt-3">${prevContent}</textarea>
    `,
    showCancelButton: false,
    confirmButtonText: "Update",
    showLoaderOnConfirm: true,

    preConfirm: () => {
      const title = document.getElementById("title").value;
      const content = document.getElementById("content").value;
      return { title, content };
    },

    allowOutsideClick: () => !Swal.isLoading(),
  }).then((result) => {
    console.log(result); // {title: "route", content: "academy"}
    sendUpdateData({
      noteID,
      token,
      updater,
      title: result.value.title,
      content: result.value.content,
    });
  });
}

// *[2] send new title and content
async function sendUpdateData({ noteID, token, updater, title, content }) {
  const { data } = await axios.put(
    `https://note-sigma-black.vercel.app/api/v1/notes/${noteID}`,
    { title, content },
    { headers: { token } }
  );

  getAllNotes({ token, updater });

  Swal.fire({
    position: "center",
    icon: "success",
    title: "Your Note has been updated",
    showConfirmButton: false,
    timer: 1000,
  });
}
// *[3] get Notes after update
