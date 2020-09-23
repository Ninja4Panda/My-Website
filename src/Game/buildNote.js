/**
 * Build the note UI
 */
export function buildNote() {
    const note = document.createElement("textarea");
    note.className = "note";
    note.style ="resize: none; overflow-y: scroll; height:200px;";
    note.placeholder= "Write down your notes here";
    const content = document.getElementById("contents");
    content.insertBefore(note, content.childNodes[1]);
}
