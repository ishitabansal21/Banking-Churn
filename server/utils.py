import base64
import io


def convert_plot_to_base64(fig):
    """Converts a Matplotlib figure to a base64 string."""
    buffer = io.BytesIO()
    fig.savefig(buffer, format='png', bbox_inches='tight')
    buffer.seek(0)
    base64_image = base64.b64encode(buffer.getvalue()).decode('utf-8')
    buffer.close()
    return base64_image

