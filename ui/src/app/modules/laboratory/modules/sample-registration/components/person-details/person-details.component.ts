import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { MatRadioChange } from "@angular/material/radio";
import { RegistrationService } from "src/app/modules/registration/services/registration.services";
import { DateField } from "src/app/shared/modules/form/models/date-field.model";
import { Dropdown } from "src/app/shared/modules/form/models/dropdown.model";
import { FormValue } from "src/app/shared/modules/form/models/form-value.model";
import { PhoneNumber } from "src/app/shared/modules/form/models/phone-number.model";
import { TextArea } from "src/app/shared/modules/form/models/text-area.model";
import { Textbox } from "src/app/shared/modules/form/models/text-box.model";

@Component({
  selector: "app-person-details",
  templateUrl: "./person-details.component.html",
  styleUrls: ["./person-details.component.scss"],
})
export class PersonDetailsComponent implements OnInit {
  patientIdentifierTypes: any[];
  @Output() personDetails: EventEmitter<any> = new EventEmitter<any>();
  personDetailsCategory: string = "new";
  personDetailsData: any = {};
  personFields: any[];
  identifiersFields: any[];
  primaryIdentifierField: any;
  showOtherIdentifiers: boolean = false;
  constructor(private registrationService: RegistrationService) {}

  ngOnInit(): void {
    this.registrationService
      .getPatientIdentifierTypes()
      .subscribe((response) => {
        if (response) {
          const primaryIdentifier = (response?.filter(
            (identifier) => identifier?.required
          ) || [])[0];
          this.primaryIdentifierField = primaryIdentifier
            ? new Textbox({
                id: primaryIdentifier?.id,
                key: primaryIdentifier?.id,
                label: primaryIdentifier?.name,
                required: true,
              })
            : null;

          const otherIdentifiers =
            response?.filter((identifier) => !identifier?.required) || [];

          this.identifiersFields = otherIdentifiers.map((identifier) => {
            return new Textbox({
              id: identifier?.id,
              key: identifier?.id,
              label: identifier?.name,
              required: identifier?.required,
            });
          });
        }
      });
    this.personFields = [
      new Textbox({
        id: "firstName",
        key: "firstName",
        label: "First name",
        required: true,
        type: "text",
      }),
      new Textbox({
        id: "middleName",
        key: "middleName",
        label: "Middle name",
        type: "text",
      }),
      new Textbox({
        id: "lastName",
        key: "lastName",
        label: "Last name",
        required: true,
        type: "text",
      }),
      new Dropdown({
        id: "gender",
        key: "gender",
        label: "Gender",
        required: true,
        type: "text",
        options: [
          {
            key: "Male",
            label: "Male",
            value: "M",
          },
          {
            key: "Female",
            label: "Female",
            value: "F",
          },
        ],
        shouldHaveLiveSearchForDropDownFields: false,
      }),
      new Textbox({
        id: "age",
        key: "age",
        label: "Age",
        required: false,
        type: "number",
        min: 0,
        max: 150,
      }),
      new DateField({
        id: "dob",
        key: "dob",
        label: "Date of birth",
        required: false,
        type: "date",
      }),
      new PhoneNumber({
        id: "mobileNumber",
        key: "mobileNumber",
        label: "Mobile number",
        required: true,
        type: "number",
        min: 0,
        placeholder: "Mobile number",
        category: "phoneNumber",
      }),
      new Textbox({
        id: "email",
        key: "email",
        label: "Email",
        required: false,
        type: "text",
        placeholder: "Email",
        category: "email",
      }),
      new TextArea({
        id: "address",
        key: "address",
        label: "Address",
        required: true,
        type: "text",
      }),
    ];
  }

  onFormUpdate(formValues: FormValue): void {
    const values = formValues.getValues();
    Object.keys(values).forEach((key) => {
      this.personDetailsData[key] = values[key]?.value;
    });
    this.personDetails.emit(this.personDetailsData);
  }

  onUpdatePrimaryIdentifierForm(formValues: FormValue): void {
    const values = formValues.getValues();
    Object.keys(values).forEach((key) => {
      this.personDetailsData[key] = values[key]?.value;
    });
    this.personDetails.emit(this.personDetailsData);
  }

  onUpdateIdentifierForm(formValues: FormValue): void {
    const values = formValues.getValues();
    Object.keys(values).forEach((key) => {
      this.personDetailsData[key] = values[key]?.value;
    });
    this.personDetails.emit(this.personDetailsData);
  }

  toggleIdentifiers(event: Event): void {
    event.stopPropagation();
    this.showOtherIdentifiers = !this.showOtherIdentifiers;
  }

  setPersonDetails(personDetails?: any): void {
    this.personFields = [
      new Textbox({
        id: "firstName",
        key: "firstName",
        label: "First name",
        required: true,
        value: personDetails ? personDetails?.preferredName?.givenName : null,
        type: "text",
      }),
      new Textbox({
        id: "middleName",
        key: "middleName",
        label: "Middle name",
        value: personDetails ? personDetails?.preferredName?.familyName2 : null,
        type: "text",
      }),
      new Textbox({
        id: "lastName",
        key: "lastName",
        label: "Last name",
        required: true,
        value: personDetails ? personDetails?.preferredName?.familyName : null,
        type: "text",
      }),
      new Dropdown({
        id: "gender",
        key: "gender",
        label: "Gender",
        required: true,
        type: "text",
        value: personDetails ? personDetails?.gender : null,
        options: [
          {
            key: "Male",
            label: "Male",
            value: "M",
          },
          {
            key: "Female",
            label: "Female",
            value: "F",
          },
        ],
        shouldHaveLiveSearchForDropDownFields: false,
      }),
      new Textbox({
        id: "age",
        key: "age",
        label: "Age",
        required: false,
        value: personDetails ? personDetails?.age : null,
        type: "number",
        min: 0,
        max: 150,
      }),
      new DateField({
        id: "dob",
        key: "dob",
        label: "Date of birth",
        required: false,
        value: personDetails
          ? personDetails?.birthdate?.substring(0, 10)
          : null,
        type: "date",
      }),
      new PhoneNumber({
        id: "mobileNumber",
        key: "mobileNumber",
        label: "Mobile number",
        required: true,
        type: "number",
        value: personDetails ? personDetails?.phoneNumber : null,
        min: 0,
        placeholder: "Mobile number",
        category: "phoneNumber",
      }),
      new Textbox({
        id: "email",
        key: "email",
        label: "Email",
        required: false,
        value: personDetails ? personDetails?.email : null,
        type: "text",
        placeholder: "Email",
        category: "email",
      }),
      new TextArea({
        id: "address",
        key: "address",
        label: "Address",
        value: personDetails ? personDetails?.address : null,
        required: true,
        type: "text",
      }),
    ];
  }

  onGetPersonDetails(personDetails: any): void {
    this.setPersonDetails(personDetails);
  }

  getSelection(event: MatRadioChange): void {
    this.personDetailsCategory = event?.value;
    if (this.personDetailsCategory === "new") {
      this.setPersonDetails();
    }
  }
}
