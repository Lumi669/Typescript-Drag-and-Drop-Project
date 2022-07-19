//autobind decorator
function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjustDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjustDescriptor;
}

class ProjectInput {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLFormElement;
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
        this.templateElement = document.getElementById("project-input")! as HTMLTemplateElement;

        this.hostElement = document.getElementById("app")! as HTMLDivElement;

        const importedNode = document.importNode(this.templateElement.content, true);

        //get the concrete element out of the template content
        this.element = importedNode.firstElementChild as HTMLFormElement;

        // add an id
        this.element.id = "user-input";

        //access the 3 input elements in the class
        this.titleInputElement = this.element.querySelector("#title") as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector("#description") as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector("#people") as HTMLInputElement;
        this.configure();
        this.attach();
    }

    @Autobind
    private submitHandler(event: Event) {
        event.preventDefault();
        console.log("form submitted = ", this.titleInputElement.value);
    }

    private configure() {
        //use "this" instead of "ProjectInput" for the bind argument !!!
        //this.element.addEventListener("submit", this.submitHandler.bind(this));

        //now use autobind decorator, so no need to use bind here
        this.element.addEventListener("submit", this.submitHandler);
    }

    private attach() {
        this.hostElement.insertAdjacentElement("afterbegin", this.element);
    }
}

// create an instance, now in UI form shows
const prjInput = new ProjectInput();
