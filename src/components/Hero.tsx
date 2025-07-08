import { Button } from './ui/button'

export default function Hero() {
    return (
        <div className="relative overflow-hidden h-screen bg-gradient-to-b from-[#091320] via-[#12253c] to-[#091320]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                {/* <div className="absolute top-0 left-0">
          <div className="w-24 h-24 bg-green-500"></div>
          <div className="w-12 h-12 bg-green-500 ml-12 -mt-6"></div>
        </div> */}
                <div className="text-center">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                        Grow your brand with<br />smarter engagement
                    </h1>
                    <p className="text-xl mb-10 max-w-3xl mx-auto">
                        Moderate social media comments, drive more sales, and increase engagement automatically
                        through comments and conversations with AI.
                    </p>
                    <div className="flex justify-center space-x-4">
                        <Button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 text-lg">
                            Get Started
                        </Button>
                        <Button variant="outline" className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white px-8 py-3 text-lg">
                            Book a Demo
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}