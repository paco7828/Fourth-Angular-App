import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-component',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-component.component.html',
  styleUrl: './form-component.component.css'
})
export class FormComponentComponent {
  noteForm = new FormGroup({
    noteHeading: new FormControl('', Validators.required),
    noteDescription: new FormControl('', Validators.required)
  })

  deleteNote(event: MouseEvent) {
    // classlist isn't added to get animation
    const deleteableNote = (event.target as HTMLElement).parentNode as HTMLElement;
    if (deleteableNote) {
      //deleteableNote.classList.add("disappear-animation");
      //deleteableNote.addEventListener("animationend", function () {
        deleteableNote.remove();
      //});
    }
  }

  noteDivStyles = {
    display: "grid",
    placeItems: "center",
    gap: "15px",
    textAlign: "center",
    height: "fit-content",
    width: "200px",
    border: "3px solid red",
    borderRadius: "16px",
    padding: "5px",
    opacity: "1",
    animation: "appear 0.5s ease-in 1 forwards"
  }

  handleSubmit() {
    // class is added (note-div) but the styles aren't applied to dinamically created HTML elements
    const notesContainer = document.getElementById("notes-container");
    if (notesContainer) {
      const noteHeadingValue = this.noteForm.value.noteHeading;
      const noteDescriptionValue = this.noteForm.value.noteDescription;
      if (noteHeadingValue !== "" && noteDescriptionValue !== "") {
        let noteDiv = document.createElement("div") as HTMLDivElement;
        let cssText = '';
        for (let i = 0; i < Object.keys(this.noteDivStyles).length; i++) {
          let key = Object.keys(this.noteDivStyles)[i];
          let value = Object.values(this.noteDivStyles)[i];
          cssText += `${key}: ${value};`;
        }
        noteDiv.style.cssText = cssText;

        noteDiv.innerHTML = `
      <h2>${noteHeadingValue}</h2>
      <p>${noteDescriptionValue}</p>
      <button (click)="deleteNote($event)">Delete note</button>
      `;
        notesContainer.appendChild(noteDiv);
      }
      else {
        alert("Empty note heading or note description!");
      }
    }
    else {
      alert("notes-container doesn't exist!");
    }
    return false;
  }
}
