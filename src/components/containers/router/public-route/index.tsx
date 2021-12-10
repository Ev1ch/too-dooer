interface IPrivateRouteProps {
  element: JSX.Element;
}

function PublicRoute({ element }: IPrivateRouteProps): JSX.Element {
  return element;
}

export default PublicRoute;
