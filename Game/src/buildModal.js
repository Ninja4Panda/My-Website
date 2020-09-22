/**
 * Creates a Modal
 * @param {Object} socket - Socket Objcet
 * @param {String} msg    - Message to display in the modal
 * @param {int} uid       - Uid that the user clicked on
 * @param {function} success_callback - Callbacks when user press yes inside the modal
 * @param {function} fail_callback    - Callbacks when user press no inside the modal
 */
export function createModal(socket, msg, uid, success_callback, fail_callback) {
    //Create the backdrop
    const backdrop = document.createElement("div");
    backdrop.className = "backdrop";
    backdrop.id = "backdrop";

    const body = document.getElementById("main");
    body.appendChild(backdrop);

    //Create the modal
    const modal = document.createElement("div");
    modal.id = "myModal";
    modal.className = "myModal";

    //Create the text
    const text = document.createElement("p");
    text.innerText = msg;
    text.className = "font-weight-bold text-center";
    modal.appendChild(text);
    body.appendChild(modal);

    //Create the modal footer
    const modal_footer = document.createElement("div");
    modal_footer.style = "display:grid; grid-template-columns:auto auto;";
    modal.appendChild(modal_footer);

    //Create no button
    const no_btn = document.createElement("div");
    no_btn.innerText = '❌';
    no_btn.style.textAlign = "center";
    no_btn.className = "modal_btn";
    no_btn.addEventListener('click', function() {
        closeModal();
        if(fail_callback) {
            fail_callback(socket);
        }
    });
    modal_footer.appendChild(no_btn);
  
    //Create yes button
    const yes_btn = document.createElement("div");
    yes_btn.innerText = "✔";
    yes_btn.style.textAlign = "center";
    yes_btn.className = "modal_btn";
    yes_btn.addEventListener('click', function() {
        closeModal();
        success_callback(socket, uid);
    });
    modal_footer.appendChild(yes_btn);
}

/**
 * Remove the modal
 */
export function closeModal() {
    const backdrop = document.getElementById("backdrop");
    if (backdrop) {
        const modal = document.getElementById("myModal");
        backdrop.remove();
        modal.remove();
    }
}