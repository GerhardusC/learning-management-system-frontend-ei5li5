import { render } from "@testing-library/react";
import AlertComponent from "@/components/alert_system/AlertComponent";
import { Providers } from "@/app/redux/provider";
it("renders alert correctly", () => {
  const { container } = render(
    <Providers>
      <AlertComponent />
    </Providers>
  );
  expect(container).toMatchSnapshot();
});
