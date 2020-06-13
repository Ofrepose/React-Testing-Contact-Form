import React from "react";
import { render,screen, fireEvent } from "@testing-library/react";
import App from "./App";
import ContactForm from './components/ContactForm';
import ReactTestUtils,{Simulate, act} from 'react-dom/test-utils';

test("renders App without crashing", () => {
  render(<App />);

});

test("Checks if form can be submitted properly",
    async () => {
  //arrange
      const container = render(<ContactForm />)
      const firstName = container.getByTestId("firstName");
      firstName.value = "Edd";
      Simulate.change(firstName);
      expect(firstName.value).toBe("Edd");

      const lastName = container.getByTestId('lastName');
      lastName.value = "Payne";
      Simulate.change(lastName);
      expect(lastName.value).toBe("Payne");

      const email = container.getByTestId("email");
      email.value = "danielfpayne@gmail.com";
      Simulate.change(email);
      expect(email.value).toBe("danielfpayne@gmail.com");

      const message = container.getByTestId("message");
      message.value = "This is a test";
      Simulate.change(message);
      expect(message.value).toBe("This is a test");


      const submit = container.getByTestId("submit");

      await act(() => {
          fireEvent.click(submit);
      });
      setTimeout(()=>{
          expect(container.getByTestId("data-resp")).toBeTruthy();
      },1000);



    });

test("Checks that name lengths are correct", async ()=>{
    const container = render(<ContactForm />);
    const firstName = container.getByTestId('firstName');
    fireEvent.change(firstName,{target:{value:"daniel"}});
    expect(firstName.value).toBe("daniel");

    const lastName = container.getByTestId('lastName');
    lastName.value = "Payne";
    Simulate.change(lastName);
    expect(lastName.value).toBe("Payne");

    const email = container.getByTestId("email");
    email.value = "danielfpayne@gmail.com";
    Simulate.change(email);
    expect(email.value).toBe("danielfpayne@gmail.com");

    const message = container.getByTestId("message");
    fireEvent.change(message,{target:{value:'This is a test'}})
    expect(message.value).toBe("This is a test");

    const submit = container.getByTestId("submit");

    await act(() => {
        fireEvent.click(submit);
    });




})
