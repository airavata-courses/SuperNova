import io
import tempfile
from datetime import datetime
from os.path import exists

import matplotlib
import matplotlib.pyplot as plt
import nexradaws
import pyart
import pytz
from PIL import Image
from starlette.responses import FileResponse
import base64
matplotlib.use('Agg')

def plot_reflectivity(radar_id, month, day, year):
    try:
        plot_path = './output/{0}-{1}-{2}-{3}.gif'.format(radar_id, year, month, day)
        if not exists(plot_path):
            templocation = tempfile.mkdtemp()
            conn = nexradaws.NexradAwsInterface()
            central_timezone = pytz.timezone('US/Central')
            start = central_timezone.localize(datetime(year, month, day, 17, 0))
            end = central_timezone.localize(datetime(year, month, day, 19, 0))
            scans = conn.get_avail_scans_in_range(start, end, radar_id)
            print("There are {} scans available between {} and {}\n".format(len(scans), start, end))

            max_scan = 5 if len(scans) >= 5 else len(scans)
            results = conn.download(scans[0: max_scan], templocation)

            frames = []
            for i, scan in enumerate(results.iter_success(), start=1):
                fig = plt.figure(figsize=(4, 4))
                # ax = fig.add_subplot(2, 2, i)
                radar = scan.open_pyart()
                display = pyart.graph.RadarDisplay(radar)
                display.plot('reflectivity', 0)
                # plt.axis('off')
                # display.set_limits((-150, 150), (-150, 150), ax=ax)
                # plt.savefig(f'{str(scan.radar_id)+ str(scan.scan_time)}.png', dpi=300, facecolor='w', edgecolor='w')
                bytes_image = io.BytesIO()
                plt.savefig(bytes_image, format='png')
                bytes_image.seek(0)
                frames.append(Image.open(bytes_image))

            # Save into a GIF file that loops forever

            frames[0].save(plot_path,
                           format='GIF',
                           append_images=frames[1:],
                           save_all=True,
                           duration=400, loop=0)

        if exists(plot_path):
            print('Safety Net: Plot exists')
        with open(plot_path, "rb") as image_file:
            base64PlotData = base64.b64encode(image_file.read())
        return base64PlotData
    except Exception as e:
        print("Exception: plot_reflectivity:", e)
    return None
