class ProjectInput {
  templateElement: HTMLTemplateElement;
  hoseElement: HTMLDivElement;

  constructor() {
    this.templateElement = document.getElementById(
      "project-input"
    )! as HTMLTemplateElement;
    this.hoseElement = document.getElementById("app")! as HTMLDivElement;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
  }
}
