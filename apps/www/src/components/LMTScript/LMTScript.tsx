const LMTScript: React.FC = () => {
  return (
    <script
      type="text/javascript"
      src={`https://widgets.sir.sportradar.com/${process.env.NEXT_PUBLIC_SR_WIDGET_CLIENT_ID}/widgetloader`}
      data-sr-language="pt"
      async
    ></script>
  )
}

export default LMTScript
