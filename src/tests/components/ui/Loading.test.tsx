import Loading from "@/components/ui/Loading";
import { render, screen } from "@testing-library/react";

describe('Loading component', () => {
  it('renders main container', () => {
    render(<Loading />);
    const mainElement = screen.getByRole('main');
    expect(mainElement).toBeInTheDocument();
    expect(mainElement).toHaveClass('w-full h-full flex flex-col justify-center items-center gap-5 -mt-20');
  });

  it('renders Heading component', () => {
    render(<Loading />);
    const headingElement = screen.getByRole('heading');
    expect(headingElement).toBeInTheDocument();
  });

  it('Heading component displays "Loading.."', () => {
    render(<Loading />);
    const headingElement = screen.getByRole('heading');
    expect(headingElement).toHaveTextContent('Loading..');
  });
});