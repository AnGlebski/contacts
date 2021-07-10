import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { Contacts } from '../pages/Contacts';
import { server } from './server.tests';



beforeAll(() => server.listen());
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe(`contacts get data`, () => {
  test(`loading`, async () => {
    render (<Contacts />);
    const loader = screen.getByTestId("contacts-loader");

    expect(loader).toBeInTheDocument();
    await waitForElementToBeRemoved(loader);
  });

  test(`success`, async () => {
    render (<Contacts />);
    const loader = screen.getByTestId("contacts-loader");

    await waitForElementToBeRemoved(loader);

    expect(loader).not.toBeInTheDocument();
    expect(screen.getByTestId("contacts-table-container")).toBeInTheDocument();
  });

  test(`fail`, async () => {
    server.use(
      rest.get('https://randomuser.me/api/?results=10', (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({
            error: "Internal server error",
          })
        )
      })
    );
    render (<Contacts />);
    const loader = screen.getByTestId("contacts-loader");

    await waitForElementToBeRemoved(loader);

    expect(loader).not.toBeInTheDocument();
    expect(screen.getByTestId("contacts-error")).toBeInTheDocument();
  });

  // describe(`contacts data view mode`, () => {
  //   test(`should equal table`, () => {
  //     render (<Contacts />);
  //     const loader = screen.getByTestId("contacts-loader");

  //     await waitForElementToBeRemoved(loader);

  //     expect(screen.getByTestId("toggle-data-viewmode-grid")).toBeInTheDocument();
  //     expect(screen.getByTestId("toggle-data-viewmode-table")).toBeInTheDocument();
  //   });
  });
});
