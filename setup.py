from setuptools import setup

setup(
    name='xo',
    packages=['xo'],
    include_package_data=True,
    install_requires=[
        'Flask==0.12.2',
        'Flask-SocketIO==2.9.4',
    ],
)
